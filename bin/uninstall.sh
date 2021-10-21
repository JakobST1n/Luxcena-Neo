#!/bin/bash

printf "\e[37mLuxcena-\e[31mn\e[32me\e[34mo\e[0m\n"
printf '\e[93m%s\e[0m' "-----------"

if [ "$EUID" -ne 0 ]; then
    echo "You need to run this script as root."
    echo "Try running with 'sudo ./bin/install.sh'"
    exit 1
fi

function die() {
    tput setaf 1
    printf "\n\nInstall failed, successfull steps not reversed.\n"
    tput sgr0
    exit 1
}


function TPUT() {
  if [ -t 1 ]; then
    if [ "$1" = "tput" ]; then
        shift
    fi
    tput $@
  fi
}

function header() {
    TPUT setaf 3
    if [ -t 1 ]; then
      printf "\n[ ] $1"
    else
      printf "\n- $1"
    fi
    TPUT sgr0
}

function commandError() {
    trap - 1
    cat /tmp/luxcena-neo-update.log
    
    TPUT setaf 1
    printf "\n\nInstall failed.\n"
    TPUT sgr0
    TPUT cnorm
    exit 1
}

function spinner() {
    i=1
    sp="/-\|"
    while ps a | awk '{print $1}' | grep -q "$1"; do
        TPUT cub $(tput cols)
        TPUT cuf 1
        printf "${sp:i++%${#sp}:1}"
        TPUT cuf $(tput cols)
        sleep 0.09
    done
    
    TPUT cub $(tput cols)
    TPUT cuf 1
}

function execCommand() {
    TPUT sc
    TPUT setaf 4
    if [ -t 1 ]; then
      printf " ($1)"
    else
      printf "\n>> $1 "
    fi
    TPUT sgr0
    bash -c "$1 > /tmp/luxcena-neo-update.log 2>&1" &

    PID=$!
    
    if [ -t 1 ]; then
      spinner $PID
    fi

    wait $PID
    commandSucc=$?
    if [ $commandSucc -eq 0 ]; then
        TPUT setaf 2
        printf "✓"
        TPUT sgr0
        TPUT rc
        TPUT el
    else
        TPUT setaf 1
        printf "x"
        TPUT sgr0
        TPUT cuf $(tput cols)
        printf "\n"
        if [ $# -eq 1 ] || [ $2 -eq "0" ]; then
            commandError
        fi
    fi
}

function dlgYN() {
    TPUT sc
    TPUT setaf 4
    printf "$1 (y/n)? "
    while :
    do
        read -n 1 -p "" YNQuestionAnswer
        if [[ $YNQuestionAnswer == "y" ]]; then
            TPUT rc; TPUT el
            printf ". $1?: \e[0;32mYes\e[0m\n"
            TPUT sc
            eval $2=1 # Set parameter 2 of input to the return value
            break
        elif [[ $YNQuestionAnswer == "n" ]]; then
            TPUT rc; TPUT el
            printf ". $1?: \e[0;31mNo\e[0m\n"
            eval $2=0 # Set parameter 2 of input to the return value
            break
        fi
    done
}

TPUT civis
TPUT setaf 8
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

    TPUT setaf 2
    printf "\nEverything should now be gone.\n"
    printf "/etc/luxcena-neo and /var/log/luxcena-neo is not removed.\n"
    TPUT sgr0
    TPUT setaf 8
    printf "Well, some dependencies still exists. Those are:\n"
    printf " - packages (nodejs python3 python3-pip)\n"
    TPUT sgr0
fi
