#!/bin/bash

tput rev
printf '%s\n' "Luxcena-neo Installer"
tput sgr0
printf '\e[93m%s\e[0m\n\n' "---------------------"

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

# Update system
dlgYN ". Update your system" res
if [ $res -eq 1 ]; then
    tput sc
    sudo apt-get -y -qq update || { printf "\n\nInstall failed.\n"; exit 1; }
    sudo apt-get -y -qq upgrade || { printf "\n\nInstall failed.\n"; exit 1; }
    tput rc; tput ed
fi

# Install packages
dlgYN ". Install required packages" res
if [ $res -eq 1 ]; then
    tput sc
    sudo apt-get -y -qq install nodejs scons python-dev swig || { printf "\n\nInstall failed.\n"; exit 1; }
    if [ $? -eq 0 ]; then
        tput rc; tput ed
        printf "✓"
    else
        printf "\nInstall failed.\n"
        exit 1
    fi
else
    tput setaf 2
    printf "  We are now assuming that all the following packages exists on your system:\n"
    printf "    nodejs scons python-dev swig\n"
    tput sgr0
fi

# Install led-library
dlgYN ". Install jgarff's rpi_ws281x library" res
if [ $res -eq 1 ]; then
    tput sc
    git clone https://github.com/jgarff/rpi_ws281x /tmp/rpi_ws281x # TODO CHANGE PATH
    python /tmp/rpi_ws281x/python/setup.py install # TODO CHANGE PAHT
    if [ $? -eq 0 ]; then
        tput rc; tput ed
        printf "✓"
    else
        printf "\nInstall failed.\n"
        exit 1
    fi
fi

tput setaf 4
printf ". Installing the app itself...\n"
tput sgr0

# Create user 'luxcena-neo'
tput setaf 8
printf '%s\n' "  - Creating user 'lux-neo'..."
tput sgr0
username="lux-neo"
sudo egrep "^$username" /etc/passwd >/dev/null
if [ $? -eq 0 ]; then
	echo "User already exists, continuing..."
else
	#pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)
	sudo useradd -m $username
	[ $? -eq 0 ] && echo "User has been added to system!" || { printf "\n\nInstall failed.\n"; exit 1; }
fi


userDir=$(eval echo "~$username")

# First we make our directories
tput setaf 8
printf '%s\n' "  - Making app-dir (/bin/luxcena-neo)..."
tput sgr0
sudo mkdir -p "$userDir/install" || { printf "\n\nInstall failed.\n"; exit 1; }
sudo chown $username:$username "$userDir/install"
sudo mkdir -p "$userDir/install/src" || { printf "\n\nInstall failed.\n"; exit 1; }
sudo chown $username:$username "$userDir/install/src"
sudo mkdir -p "$userDir/install/userdata" || { printf "\n\nInstall failed.\n"; exit 1; }
sudo chown $username:$username "$userDir/install/userdata"

# Third we copy the source into the correct swap-folder
tput setaf 8
printf '%s\n' "  - Copying sourceCode to app-dir..."
tput sgr0
sudo cp -r . "$userDir/install/src" || { printf "\n\nInstall failed.\n"; exit 1; }
sudo chown -R $username:$username "$userDir/install/src"

# fourth we run npm i
tput setaf 8
printf '%s\n' "  - Running npm i..."
tput sgr0
tput sc
export NODE_ENV=production || { printf "\n\nInstall failed.\n"; exit 1; }
sudo runuser -l $username -c 'npm --prefix ~/install/src install ~/install/src --only=production || { printf "\n\nInstall failed.\n"; exit 1; }' # This is probably a bit overkill to have --only=... but better safe than sorry?
if [ $? -eq 0 ]; then
fi
tput rc; tput ed

# Fifth we add the service files
tput setaf 8
printf '%s\n' "  - Adding service-file to systemd..."
tput sgr0
sudo cp bin/luxcena-neo.service /etc/systemd/system/luxcena-neo.service
sudo systemctl daemon-reload

# Installation is done!
printf '\n\e[5m%s\e[0m\n' "🎉Luxcena-Neo is now installed🎉"
