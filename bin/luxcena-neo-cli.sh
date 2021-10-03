#!/bin/bash

usage() {
    printf "Usage: $0 update/uninstall/start/stop\n" 1>&2
    exit 1
}

function die() {
    tput setaf 1
    printf "\n\nInstall failed.\n"
    printf "Check the logfile at '/tmp/lucxena-neo.install.log'.\n"
    printf "Use this command to see the last 30 lines of the file;\n"
    printf "    tail -n 30 /tmp/luxcena-neo.install.log"
    tput sgr0
    exit 1
}

function dlgYN() {
    tput sc
    tput setaf 4
    printf "$1 (y/n)? "
    while :
    do
        read -n 1 -p "" YNQuestionAnswer
        if [[ $YNQuestionAnswer == "y" ]]; then
            tput rc; tput el
            printf ". $1?: \e[0;32mYes\e[0m\n"
            tput sc
            eval $2=1 # Set parameter 2 of input to the return value
            break
        elif [[ $YNQuestionAnswer == "n" ]]; then
            tput rc; tput el
            printf ". $1?: \e[0;31mNo\e[0m\n"
            eval $2=0 # Set parameter 2 of input to the return value
            break
        fi
    done
}

while getopts ":a:" o; do
    case "${o}" in
        a )
            p=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

printf "\e[37mLuxcena-\e[31mn\e[32me\e[34mo\e[37m-cli \e[90m[args: '$*']\n\n\e[0m"

action=$1
if [ "$action" == "update" ]; then

  tput rev
  printf '%s\n' "Luxcena-neo Updater"
  tput sgr0
  printf '\e[93m%s\e[0m\n\n' "-------------------"

  if [ "$EUID" -ne 0 ]; then
      echo "You need to run this script as root."
      echo "Try running with 'sudo ./bin/install.sh'"
      exit 1
  fi

  # Stop the service if it is running already
  systemctl stop luxcena-neo

  # Go to source code directory
  WDIR="/opt/luxcena-neo"
  #cd "$WDIR"

  # Fetch newest changes on branch
  runuser -l 'lux-neo' -c "git -C $WDIR pull" || die

  # Add node repo
  curl -fsSL https://deb.nodesource.com/setup_14.x | bash - || die

  # Make sure nodejs and prerequisites is installed
  apt -qy install nodejs python-pip || die

  # Make sure we have python virtualenv installed
  pip3 install virtualenv || die

  # Create and configure python virtualenv
  runuser -l 'lux-neo' -c "rm -rf $WDIR/NeoRuntime/Runtime/venv" || die
  runuser -l 'lux-neo' -c "virtualenv -p /usr/bin/python3 $WDIR/NeoRuntime/Runtime/venv" || die
  runuser -l 'lux-neo' -c "source $WDIR/NeoRuntime/Runtime/venv/bin/activate && pip install rpi_ws281x" || die

  # Build and run all npm scripts
  if [ "$2" != "skipNode" ]; then
      runuser -l 'lux-neo' -c "export NODE_ENV=development; npm --prefix $WDIR install $WDIR" || die
  fi
  ##runuser -l 'lux-neo' -c "cd $WDIR && npm run build:frontend" || die
  ##runuser -l 'lux-neo' -c "cd $WDIR && npm run build:fontawesome" || die
  ##runuser -l 'lux-neo' -c "cd $WDIR && npm run build:dialog-polyfill" || die
  runuser -l 'lux-neo' -c "npm --prefix \"$WDIR\" run build:frontend" || die
  runuser -l 'lux-neo' -c "npm --prefix \"$WDIR\" run build:fontawesome" || die
  runuser -l 'lux-neo' -c "npm --prefix \"$WDIR\" run build:dialog-polyfill" || die


  # Install new cli script
  cp /opt/luxcena-neo/bin/luxcena-neo-cli.sh /usr/bin/luxcena-neo-cli.sh || die
  
  # Install updated systemd script
  cp /opt/luxcena-neo/bin/luxcena-neo.service /etc/systemd/system/luxcena-neo.service || die
  systemctl daemon-reload || die

  printf "Update complete.\n"
  systemctl start luxcena-neo
  systemctl enable luxcena-neo
  exit 0

elif [ "$action" == "uninstall" ]; then
    tput setab 1
    printf '%s\n' "Luxcena Neo Uninstaller..."
    tput sgr0
    printf '\e[93m%s\e[0m\n' "--------------------------"
    tput setaf 8
    printf "By uninstalling Luxcena-Neo you might loose all data, including your scripts.\n\n"

    dlgYN "Are you sure you want to uninstall?" res
    if [ $res -eq 1 ]; then
        systemctl stop luxcena-neo
        deluser lux-neo
        rm -rf /home/lux-neo
	rm -rf /opt/luxcena-neo
        rm /etc/systemd/system/luxcena-neo.service
        rm /usr/bin/luxcena-neo.sh
        rm /usr/bin/lux-neo


        tput setaf 2
        printf "\nEverything should now be gone.\n"
        printf "/etc/luxcena-neo and /var/log/luxcena-neo is not removed.\n"
        tput sgr0
        tput setaf 8
        printf "Well, some dependencies still exists. Those are:\n"
        printf " - rpi_ws281x-library\n"
        printf " - packages (nodejs scons python-dev swig)\n"
        tput sgr0
    fi

elif [ "$action" == "start" ]; then
    systemctl start luxcena-neo
    if [ "$2" == "boot" ]; then
        systemctl enable luxcena-neo
        printf "Now starting on boot...\n"
    fi
    printf "Luxcena-neo service started...\n"

elif [ "$action" == "stop" ]; then
    systemctl stop luxcena-neo
    if [ "$2" == "boot" ]; then
        systemctl disable luxcena-neo
        printf "Not longer active on boot...\n"
    fi
    printf "Luxcena-neo service stopped...\n"

elif [ "$action" == "status" ]; then
    printf "╭─────────────────────╮\n"
    printf "│ Service active: "
    [[ "$(systemctl is-active luxcena-neo)" == *"active"* ]]   && printf '\e[32m%s\e[0m │\n' "yes" || printf '\e[31m%s\e[0m  │\n' "no"
    printf "│ Starts on boot: "
    [[ "$(systemctl is-enabled luxcena-neo)" == *"enabled"* ]] && printf '\e[32m%s\e[0m │\n' "yes" || printf '\e[31m%s\e[0m  │\n' "no"
    printf "│ Has failed:     "
    [[ "$(systemctl is-failed luxcena-neo)" == *"failed"* ]]   && printf '\e[32m%s\e[0m │\n' "yes" || printf '\e[31m%s\e[0m  │\n' "no"
    printf "╰─────────────────────╯\n\n"

    printf '\e[93m%s\e[0m\n' "━━━Service status━━━━━━━━━━━━━━━━━━"
    systemctl status luxcena-neo
    printf '\e[93m%s\e[0m\n' "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

elif [ "$action" == "log" ]; then
    if [ "$2" == "service" ]; then
        printf '\e[93m%s\e[0m\n' "━━━Service log (press ctrl+c to exit)━━━━━━━━━━━━━━━━━━"
        tail -F -n 20 /var/log/luxcena-neo/service.log
    fi
    if [ "$2" == "app" ]; then
        printf '\e[93m%s\e[0m\n' "━━━App log (press ctrl+c to exit)━━━━━━━━━━━━━━━━━━"
        tail -F -n 20 /var/log/luxcena-neo/logger.log
    fi

elif [ "$action" == "version" ] || [ "$action" == "v" ]; then
    printf "╭─────────────────────╮\n"
    printf "│ Version: Unknown    │\n"
    printf "│ branch : $(git -C /opt/luxcena-neo branch | grep \* | cut -d ' ' -f2)    │\n"
    printf "╰─────────────────────╯\n\n"

elif [ "$action" == "selectBranch" ]; then
    printf "Current $(git -C /opt/luxcena-neo branch | grep \* | cut -d ' ' -f2)Branch \n"
    runuser -l 'lux-neo' -c "git -C /opt/luxcena-neo stash"
    runuser -l 'lux-neo' -c "git -C /opt/luxcena-neo checkout $2" || printf "\e[91mYou should now run \e[90m'sudo lux-neo update'\e[91m!\n"

else
    usage
fi
