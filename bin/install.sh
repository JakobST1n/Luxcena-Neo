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
[ -d "/opt/luxcena-neo/" ] && echo "\nSeems like luxcena-neo is already installed, please do update instead" && die
execCommand "mkdir -p \"/opt/luxcena-neo\""
execCommand "chown $username:$username \"/opt/luxcena-neo\""
execCommand "mkdir -p \"/var/luxcena-neo\""
execCommand "chown $username:$username \"/var/luxcena-neo\""
execCommand "mkdir -p \"/etc/luxcena-neo\""
execCommand "chown $username:$username \"/etc/luxcena-neo\""
execCommand "mkdir -p \"/var/log/luxcena-neo\""
execCommand "chown $username:$username \"/var/log/luxcena-neo\""

# Choose branch to install
TPUT cnorm
printf '\n%s' "Which branch do you want to install (default: master)? "
read BRANCH
if [ -z "$BRANCH" ]; then
    BRANCH="master"
fi
TPUT civis

# Get source code
header "Fetch source code"
execCommand "runuser -l $username -c \"git clone -b $BRANCH https://github.com/jakobst1n/luxcena-neo /opt/luxcena-neo/\""
execCommand "chown -R lux-neo:lux-neo /opt/luxcena-neo"

# Install dependencies
header "Install dependencies"
if [ "$(uname -m)" = "armv6l" ]; then
  wget https://unofficial-builds.nodejs.org/download/release/v14.10.0/node-v14.10.0-linux-armv6l.tar.gz
  tar -xzf node-v14.10.0-linux-armv6l.tar.gz
  sudo cp -r node-v14.10.0-linux-armv6l/* /usr/local
  rm -r node-v14.10.0-linux-armv6l
  rm node-v14.10.0-linux-armv6l.tar.gz
else
  execCommand "wget -qO- https://deb.nodesource.com/setup_14.x | bash -"
  execCommand "apt -q update"
  execCommand "apt -qy install nodejs"
fi
execCommand "apt -qy install python3-pip"
execCommand "pip3 install virtualenv"
execCommand "runuser -l 'lux-neo' -c \"export NODE_ENV=development; npm --prefix /opt/luxcena-neo install /opt/luxcena-neo\""

# Create virtualenv
header "Create python virtualenv and install dependencies"
execCommand "rm -rf /opt/luxcena-neo/NeoRuntime/Runtime/venv"
execCommand "virtualenv -p /usr/bin/python3 /opt/luxcena-neo/NeoRuntime/Runtime/venv"
execCommand "source /opt/luxcena-neo/NeoRuntime/Runtime/venv/bin/activate && pip install rpi_ws281x"

# Build the source code
header "Build source code"
execCommand "runuser -l 'lux-neo' -c \"npm --prefix /opt/luxcena-neo run build:frontend\""
execCommand "runuser -l 'lux-neo' -c \"npm --prefix /opt/luxcena-neo run build:fontawesome\""
execCommand "runuser -l 'lux-neo' -c \"npm --prefix /opt/luxcena-neo run build:dialog-polyfill\""

# Install systemd service
header "Install new systemd service"
execCommand "cp /opt/luxcena-neo/bin/luxcena-neo.service /etc/systemd/system/luxcena-neo.service"
execCommand "systemctl daemon-reload"
execCommand "systemctl enable luxcena-neo"
execCommand "systemctl start luxcena-neo"

# Installation is done!
printf '\n\e[5m%s\e[0m\n' "🎉Luxcena-Neo is now installed🎉"
TPUT cnorm
