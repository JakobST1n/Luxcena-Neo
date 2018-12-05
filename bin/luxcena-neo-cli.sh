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

printf "\e[37m> \e[4mLuxcena-\e[31mn\e[34me\e[34mo\e[37-cli command: \e[90m'$*'.\n\n\e[0m"

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

  systemctl stop luxcena-neo
  runuser -l 'lux-neo' -c 'git -C ~/src pull'

  if [ "$2" != "skipNode" ]; then
      runuser -l 'lux-neo' -c 'export NODE_ENV=production; npm --prefix ~/src install ~/src --only=production'
  fi

  cp /home/lux-neo/src/bin/luxcena-neo-cli.sh /usr/bin/luxcena-neo-cli.sh
  printf "Update complete.\n"
  systemctl start luxcena-neo
  exit 0

elif [ "$action" == "uninstall" ]; then
    tput setab 1
    printf '%s\n' "Luxcena Neo Uninstaller..."
    tput sgr0
    printf '\e[93m%s\e[0m\n' "--------------------------"
    tput setaf 8
    printf "By uninstalling Luxcena-Neo you will loose all you data, including your scripts.\n\n"

    dlgYN "Are you sure you want to uninstall?" res
    if [ $res -eq 1 ]; then
        systemctl stop luxcena-neo
        deluser lux-neo
        rm -rf /home/lux-neo
        rm /etc/systemd/system/luxcena-neo.service
        rm /usr/bin/luxcena-neo.sh
        rm /usr/bin/lux-neo


        tput setaf 2
        printf "\nEverything should now be gone.\n"
        tput sgr0
        tput setaf 8
        printf "Well, some dependencies still exists. Those are:\n"
        printf " - rpi_ws281x-library\n"
        printf " - packages (nodejs scons python-dev swig)\n"
        tput sgr0
    fi

elif [ "$action" == "conf" ]; then
    nano /home/lux-neo/userdata/config/strip.json

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
        tail -F -n 20 /home/lux-neo/logs/service.log
    fi
    if [ "$2" == "app" ]; then
        printf '\e[93m%s\e[0m\n' "━━━App log (press ctrl+c to exit)━━━━━━━━━━━━━━━━━━"
        tail -F -n 20 /home/lux-neo/logs/logger.log
    fi

elif [ "$action" == "version" ] || [ "$action" == "v" ]; then
    printf "Version: Unknown\n"

elif [ "$action" == "selectBranch" ]; then
    printf "Current Branch \n"
else
    usage
fi
