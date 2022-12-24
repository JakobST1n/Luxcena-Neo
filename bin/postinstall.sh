#!/bin/bash

CWD=$PWD
. "$CWD/bin/bashfuncs.sh"

# Create virtualenv
header "Create python virtualenv and install dependencies"
execCommand "rm -rf $CWD/NeoRuntime/Runtime/venv"
execCommand "pip3 install virtualenv"
execCommand "virtualenv -p /usr/bin/python3 \"$CWD/NeoRuntime/Runtime/venv\""
execCommand "source \"$CWD/NeoRuntime/Runtime/venv/bin/activate\" && pip install websockets" 1
header "Attempting to install the rpi_ws281x library, if you want to actually control some leds you need this. Don't worry if not."
execCommand "source \"$CWD/NeoRuntime/Runtime/venv/bin/activate\" && pip install rpi_ws281x" 1

