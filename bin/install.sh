#!/bin/bash

tput rev
printf '%s\n' "Luxcena-neo Installer"
tput sgr0
printf '\e[93m%s\e[0m\n\n' "---------------------"

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

# Create user 'luxcena-neo'
tput setaf 8
printf '%s\n' "- Creating user 'lux-neo'..."
tput sgr0
username="lux-neo"
egrep "^$username" /etc/passwd >/dev/null
if [ $? -eq 0 ]; then
    echo "User already exists, continuing..."
else
    useradd -m $username || die
fi
usermod -a -G gpio $username
usermod -a -G spi  $username

# First we make our directories
tput setaf 8
printf '%s\n' "- Making directories..."
tput sgr0
[ -d "/opt/luxcena-neo/" ] && echo "Seems like luxcena-neo is already installed, please do update instead" && die
mkdir -p "/opt/luxcena-neo" || die
chown $username:$username "/opt/luxcena-neo" || die
mkdir -p "/var/luxcena-neo" || die
chown $username:$username "/var/luxcena-neo" || die
mkdir -p "/etc/luxcena-neo" || die
chown $username:$username "/etc/luxcena-neo" || die
mkdir -p "/var/log/luxcena-neo" || die
chown $username:$username "/var/log/luxcena-neo" || die

printf '%s' "Which branch do you want to install (default: master)? "
read BRANCH
if [ -z "$BRANCH" ]; then
    BRANCH="master"
fi

# Get source code
tput setaf 8
printf '%s\n' "- Fetch source code..."
tput sgr0
runuser -l $username -c "git clone -b $BRANCH https://github.com/jakobst1n/luxcena-neo /opt/luxcena-neo/" || die

# Install all packages, build the app, and prepare everything
tput setaf 8
printf '%s\n' "- Running installer (updater) from newly fetched source code..."
tput sgr0
/opt/luxcena-neo/bin/luxcena-neo-cli.sh update || die

# Installation is done!
printf '\n\e[5m%s\e[0m\n' "🎉Luxcena-Neo is now installed🎉"
