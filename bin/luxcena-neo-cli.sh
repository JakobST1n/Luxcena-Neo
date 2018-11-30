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

  systemctl stop lxucena-neo
  runuser -l 'lux-neo' -c 'git -C ~/src pull'
  runuser -l 'lux-neo' -c 'export NODE_ENV=production; npm --prefix ~/src install ~/src --only=production'
  printf "Update complete, run these commands to finish it completly:\n"
  printf "sudo /home/lux-neo/src/bin/post-update.sh\n"
  printf "sudo systemctl luxcena-neo start\n"
  systemctl start luxcena-neo

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

        tput setaf 2
        printf "\nEverything should now be gone. To remove the last piece, enter this command:\n"
        tput sgr0
        tput smso
        printf "sudo rm /bin/luxcena-neo\n\n"
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
elif [ "$action" == "stop" ]; then
    systemctl stop luxcena-neo
elif [ "$action" == "status" ]; then
    printf '\e[93m%s\e[0m\n' "---Service status------------------"
    systemctl status luxcena-neo
    printf '\e[93m%s\e[0m\n' "-----------------------------------"
else
    usage
fi
