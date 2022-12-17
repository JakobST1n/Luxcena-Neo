#!/bin/bash

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
    cat $1
    rm $1
    
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
    log=$(mktemp)
    bash -c "$1 > $log 2>&1" &

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
            commandError $log
        fi
    fi
    rm $log
}

TPUT civis
