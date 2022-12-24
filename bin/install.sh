#!/bin/bash

printf "\e[37mLuxcena-\e[31mn\e[32me\e[34mo\e[0m\n"
printf '\e[93m%s\e[0m' "-----------"

if [ "$EUID" -ne 0 ]; then
    echo "\nYou need to run this script as root."
    echo "Try running with 'sudo $0/install.sh'"
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

# Create user 'luxcena-neo'
header "Creating user 'lux-neo'"
username="lux-neo"
egrep "^$username" /etc/passwd >/dev/null
if [ $? -eq 0 ]; then
    printf '\n%s\n' "User already exists, continuing..."
else
    execCommand "useradd -m $username"
fi
header "Add user to groups"
execCommand "usermod -a -G gpio $username"
execCommand "usermod -a -G spi  $username"

# First we make our directories
header "Making directories"
execCommand "mkdir -p \"/var/luxcena-neo\""
execCommand "chown $username:$username \"/var/luxcena-neo\""
execCommand "mkdir -p \"/etc/luxcena-neo\""
execCommand "chown $username:$username \"/etc/luxcena-neo\""
execCommand "mkdir -p \"/var/log/luxcena-neo\""
execCommand "chown $username:$username \"/var/log/luxcena-neo\""

# Install dependencies
header "Install dependencies"
if [ "$(uname -m)" = "armv6l" ]; then
  execCommand "wget https://unofficial-builds.nodejs.org/download/release/v18.9.1/node-v18.9.1-linux-armv6l.tar.gz"
  execCommand "tar -xzf node-v18.9.1-linux-armv6l.tar.gz"
  execCommand "sudo cp -r node-v18.9.1-linux-armv6l/* /usr/local"
  execCommand "rm -r node-v18.9.1-linux-armv6l"
  execCommand "rm node-v18.9.1-linux-armv6l.tar.gz"
else
  execCommand "wget -qO- https://deb.nodesource.com/setup_18.x | bash -"
  execCommand "apt -q update"
  execCommand "apt -qy install nodejs"
fi
execCommand "apt -qy install jq curl"
execCommand "apt -qy install python3-pip python3-venv"
execCommand "pip3 install virtualenv"

# Get package
header "Download luxcena-neo"
INSTALLDIR=$(getent passwd "$username" | cut -d: -f6)
APIURL="https://api.github.com/repos/JakobST1n/luxcena-neo"
REPOINFO=$(curl -s "$APIURL/releases/latest" -H "Accept: application/vnd.github+json")
TARBALL_NAME=$(echo "$REPOINFO" | jq '.assets[0].name')
TARBALL_URL=$(echo "$REPOINFO" | jq '.assets[0].browser_download_url')
execCommand "runuser -l $username -c \"curl -s -L -o $INSTALLDIR/$TARBALL_NAME $TARBALL_URL\""

header "Install luxcena-neo"
execCommand "runuser -l $username -c \"export NODE_ENV=production; npm --prefix $INSTALLDIR/luxcena-neo-tmp/ install $INSTALLDIR/$TARBALL_NAME \""
execCommand "runuser -l $username -c \"mv $INSTALLDIR/luxcena-neo-tmp/node_modules/luxcena-neo/ $INSTALLDIR/luxcena-neo\""
execCommand "runuser -l $username -c \"rm $INSTALLDIR/$TARBALL_NAME\""
execCommand "runuser -l $username -c \"rm -r $INSTALLDIR/luxcena-neo-tmp\""

# Installation is done!
printf '\n\e[5m%s\e[0m\n' "🎉Luxcena-Neo is now installed🎉"
echo "Run 'sudo $INSTALLDIR/luxcena-neo/bin/luxcena-neo.sh'"
TPUT cnorm
