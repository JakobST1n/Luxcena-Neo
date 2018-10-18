#!/bin/bash

tput rev
printf '%s\n' "Luxcena-neo Installer"
tput sgr0
printf '\e[93m%s\e[0m\n\n' "---------------------"

LOG="/tmp/luxcena-neo.install.log"
echo "Starting Luxcena-neo installer..." > $LOG

if [ "$EUID" -ne 0 ]; then
    echo "You need to run this script as root."
    echo "Try running with 'sudo ./bin/install.sh'"
    exit 1
fi

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

# Update system
dlgYN ". Update your system" res
if [ $res -eq 1 ]; then
    tput sc
    apt-get -y update &>> $LOG || die
    apt-get -y upgrade &>> $LOG || die
    tput rc; tput ed
fi

# Install packages
dlgYN ". Install required packages" res
if [ $res -eq 1 ]; then
    tput sc
    apt-get -y install nodejs scons python-dev swig &>> $LOG || die
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
egrep "^$username" /etc/passwd >/dev/null
if [ $? -eq 0 ]; then
	echo "User already exists, continuing..."
else
	#pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)
	useradd -m $username &>> $LOG || die
fi

# First we make our directories
tput setaf 8
printf '%s\n' "  - Making app-dir (/bin/luxcena-neo)..."
tput sgr0
userDir=$(eval echo "~$username")
mkdir -p "$userDir/install" &>> $LOG || die
chown $username:$username "$userDir/install" &>> $LOG || die
mkdir -p "$userDir/install/src" &>> $LOG || die
chown $username:$username "$userDir/install/src" &>> $LOG || die
mkdir -p "$userDir/install/userdata" &>> $LOG || die
chown $username:$username "$userDir/install/userdata" &>> $LOG || die

# Third we copy the source into the correct swap-folder
tput setaf 8
printf '%s\n' "  - Copying sourceCode to app-dir..."
tput sgr0
cp -r . "$userDir/install/src" &>> $LOG || die
chown -R $username:$username "$userDir/install/src" &>> $LOG || die

# fourth we run npm i
tput setaf 8
printf '%s\n' "  - Running npm i..."
tput sgr0
tput sc
export NODE_ENV=production &>> $LOG || die
runuser -l $username -c 'npm --prefix ~/install/src install ~/install/src --only=production' &>> $LOG || die # This is probably a bit overkill to have --only=... but better safe than sorry?
tput rc; tput ed

# Fifth we add the service files
tput setaf 8
printf '%s\n' "  - Adding service-file to systemd..."
tput sgr0
cp bin/luxcena-neo.service /etc/systemd/system/luxcena-neo.service &>> $LOG || die
systemctl daemon-reload &>> $LOG || die

# Installation is done!
printf '\n\e[5m%s\e[0m\n' "🎉Luxcena-Neo is now installed🎉"
