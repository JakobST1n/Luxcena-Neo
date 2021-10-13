#!/bin/bash

usage() {
    printf "Usage: $0 update/uninstall/start/stop\n" 1>&2
    exit 1
}

function startLuxcenaNeo() {
    header "Start Luxcena NEO"
    execCommand "systemctl start luxcena-neo" 1
}

function header() {
    tput setaf 3
    printf "\n[ ] $1"
    tput sgr0
}

function commandError() {
    trap - 1
    cat /tmp/luxcena-neo-update.log
    
    tput setaf 1
    printf "\n\nInstall failed.\n"
    tput sgr0

    startLuxcenaNeo
    exit 1
}

function execCommand() {
    tput sc
    tput setaf 4
    printf " ($1)"
    tput sgr0
    bash -c "$1 > /tmp/luxcena-neo-update.log 2>&1" &

    PID=$!

    i=1
    sp="/-\|"
    while ps a | awk '{print $1}' | grep -q "$PID"; do
        tput cub $(tput cols)
        tput cuf 1
        printf "${sp:i++%${#sp}:1}"
        tput cuf $(tput cols)
        sleep 0.09
    done
    
    tput cub $(tput cols)
    tput cuf 1

    wait $PID
    commandSucc=$?
    if [ $commandSucc -eq 0 ]; then
        tput setaf 2
        printf "✓"
        tput sgr0
        tput rc
        tput el
    else
        tput setaf 1
        printf "x"
        tput sgr0
        tput cuf $(tput cols)
        printf "\n"
        if [ $# -eq 1 ] || [ $2 -eq "0" ]; then
            commandError
        fi
    fi
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
  printf '\e[93m%s\e[0m\n' "-------------------"

  if [ "$EUID" -ne 0 ]; then
    echo "You need to run this script as root."
    echo "Try running with 'sudo ./bin/install.sh'"
    exit 1
  fi

  trap commandError 1

  WDIR="/opt/luxcena-neo"

  header "Download update"
  UPDATEDIR=$(mktemp -d -p /tmp luxcena-neo-update.XXXXX)
  repoUrl=$(git -C $WDIR remote get-url origin)
  repoBranch=$(git -C $WDIR rev-parse --abbrev-ref HEAD)
  execCommand "git clone -b $repoBranch $repoUrl $UPDATEDIR"

  header "Create backup"
  execCommand "mkdir -p /opt/luxcena-neo/backup"
  BACKUPDIR=$(mktemp -d -p /var/luxcena-neo/backup backup.XXXXXX)
  execCommand "cp -R /opt/luxcena-neo/ $BACKUPDIR"

  header "Stop the running luxcena-neo"
  execCommand "systemctl stop luxcena-neo"

  header "Install update"
  execCommand "cp -Rf $UPDATEDIR/* $WDIR"
  execCommand "chown -R lux-neo:lux-neo $WDIR"

  header "Install dependencies"
  execCommand "wget -qO- https://deb.nodesource.com/setup_14.x | bash -"
  execCommand "apt -qy install nodejs python3-pip "
  execCommand "pip3 install virtualenv"
  execCommand "runuser -l 'lux-neo' -c \"export NODE_ENV=development; npm --prefix $WDIR install $WDIR\""
  
  header "Create python virtualenv and install dependencies"
  execCommand "rm -rf $WDIR/NeoRuntime/Runtime/venv"
  execCommand "virtualenv -p /usr/bin/python3 $WDIR/NeoRuntime/Runtime/venv"
  execCommand "source $WDIR/NeoRuntime/Runtime/venv/bin/activate && pip install rpi_ws281x"

  header "Build source code"
  execCommand "runuser -l 'lux-neo' -c \"npm --prefix \"$WDIR\" run build:frontend\""
  execCommand "runuser -l 'lux-neo' -c \"npm --prefix \"$WDIR\" run build:fontawesome\""
  execCommand "runuser -l 'lux-neo' -c \"npm --prefix \"$WDIR\" run build:dialog-polyfill\""

  header "Install new CLI script"
  execCommand "cp /opt/luxcena-neo/bin/luxcena-neo-cli.sh /usr/bin/luxcena-neo-cli.sh"
  
  header "Install new systemd service"
  execCommand "cp /opt/luxcena-neo/bin/luxcena-neo.service /etc/systemd/system/luxcena-neo.service"
  execCommand "systemctl daemon-reload"
  execCommand "systemctl enable luxcena-neo"
  execCommand "systemctl start luxcena-neo"

  printf "\nUpdate complete.\n"
  exit 0

elif [ "$action" == "uninstall" ]; then
    tput setab 1
    printf '%s\n' "Luxcena Neo Uninstaller..."
    tput sgr0
    printf '\e[93m%s\e[0m' "--------------------------"
    tput setaf 8
    printf "By uninstalling Luxcena-Neo you might loose all data, including your scripts.\n\n"

    dlgYN "Are you sure you want to uninstall?" res
    if [ $res -eq 1 ]; then
        header "Remove systemd service"
        execCommand "systemctl stop luxcena-neo"

        header "Delete lux-neo user"
        execCommand "deluser lux-neo"

        header "Uninstall luxcena-neo"
        execCommand "rm -rf /opt/luxcena-neo"
        execCommand "rm -f /etc/systemd/system/luxcena-neo.service"
        execCommand "rm -f /usr/bin/luxcena-neo.sh"
        execCommand "rm -f /usr/bin/lux-neo"

        tput setaf 2
        printf "\nEverything should now be gone.\n"
        printf "/etc/luxcena-neo and /var/log/luxcena-neo is not removed.\n"
        tput sgr0
        tput setaf 8
        printf "Well, some dependencies still exists. Those are:\n"
        printf " - packages (nodejs python3 python3-pip)\n"
        tput sgr0
    fi

elif [ "$action" == "start" ]; then
    header "Start luxcena-neo"
    execCommand "systemctl start luxcena-neo"

elif [ "$action" == "stop" ]; then
    header "Stop luxcena-neo"
    execCommand "systemctl stop luxcena-neo"

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
