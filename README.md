# Luxcena-Neo
Raspberry-pi addressable LED controller software

## Wiki
The wiki will be available right in the browser when you have the software installed. If you want to contribute, you follow standard procedures for contributing here, and change/add/delete the markdown-files found in `/docs`. Don't worry about the `_book` folder, as that contains the generated html wiki.

## Install
The simplest way to install it is using the install script:
```
wget https://raw.githubusercontent.com/JakobST1n/Luxcena-Neo/master/bin/install.sh && chmod +x install.sh && sudo ./install.sh && rm install.sh
```

You can also install the latest package from the releases. Just download the `luxcena-neo-<version>.tgz` file you want, and run `npm i <package.tgz>`. By using this method the auto update and stuff like that will not work by itself. You can check the install-script to see what you need. But mostly you just need something to run `node app.js`.
It is not that clever, it basically

. Creates the user `lux-neo` and adds it to the `gpio` and `spi` groups.
. Creates folders `/var/luxcena-neo` `/etc/luxcena-neo` and `/var/log/luxcena-neo`.
. Installs nodejs, pip and some other dependencies (which probably is installed already).
. Downloads the luxcena-neo package, and installs it to the home-directory of the new `lux-neo` user.
