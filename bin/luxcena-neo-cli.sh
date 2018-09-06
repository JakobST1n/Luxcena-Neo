#!/bin/bash

usage() {
    printf "Usage: $0 update/uninstall/start/stop\n" 1>&2
    exit 1
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

  sudo systemctl stop lxucena-neo
  oldDir=$PWD
  cd ~/luxcena-neo-install
  git pull
  export NODE_ENV=production
  npm i --only=production
  cd $oldDir
  sudo systemctl start luxcena-neo

elif [ "$action" == "uninstall" ]; then
    tput setab 1
    printf '%s\n' "Luxcena Neo Uninstaller..."
    tput sgr0
    printf '\e[93m%s\e[0m\n' "--------------------------"
    tput setaf 8
    printf "By uninstalling Luxcena-Neo you will loose all you data, including your scripts.\n\n"

    tput sc
    tput setaf 4
    printf ". Are you sure you want to uninstall (y/n)? "
    while :
    do
        read -n 1 -p "" YNQuestionAnswer
        if [[ $YNQuestionAnswer == "y" ]]; then
            tput rc; tput el
            printf ". Are you sure you want to uninstall? \e[0;32mYes\e[0m\n"
            tput sc
            sudo systemctl stop luxcena-neo || { printf "\n\nUninstall failed.\n"; exit 1; }
            rm -rf ~/luxcena-neo-install || { printf "\n\nUninstall failed.\n"; exit 1; }
            sudo rm /etc/systemd/system/luxcena-neo.service || { printf "\n\nUninstall failed.\n"; exit 1; }
            tput rc; tput ed

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
            break
        elif [[ $YNQuestionAnswer == "n" ]]; then
            tput rc; tput el
            printf ". Are you sure you want to uninstall? \e[0;31mNo\e[0m\n"
            break
        fi
    done

elif [ "$action" == "start" ]; then
    sudo systemctl start luxcena-neo
elif [ "$action" == "stop" ]; then
    sudo systemctl stop luxcena-neo
else
    usage
fi
