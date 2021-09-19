# Installation

If you want to install luxcena-neo to use it, these are the instructions:

---

## Requirements
* The luxcena-shield
* Access to the raspberry pi (SSH or direct)
* Root access (preferably through the `sudo` command)

## Install
1. Start with logging into your Raspberry Pi
2. Run these commands
```bash
git clone https://github.com/JakobST1n/Luxcena-Neo
cd Luxcena-Neo
sudo ./bin/install.sh
```
3. Follow the instructions on screen. You should answer yes to most of the questions.
4. The install-process might seem to hang, but there is just no output being sent to the console. If you want to see a bit more verbose output. Open another terminal session, and run this command:
```bash
tail -n 10 -f /tmp/luxcena-neo.install.log
```
This is also where you will find possible reasons for a failed install.
4. Luxcena-Neo should now be installed. Start it with this command
```bash
luxcena-neo start
```

!!! Default User "neo":"luxcena-neo"

## Troubleshooting
We haven't encountered any troubles yet, but once we do, we will post fix'es here.

---
You should now be all set to [configuring luxcena-neo](/Usage/Configuration.md).
