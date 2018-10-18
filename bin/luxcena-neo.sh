#!/bin/bash

# We want to eventually run the server as another user than root. But right now,
# the python script needs to be run as root, and since the server is starting them
# the server needs root as well.

#runuser -l pi -c "export NODE_ENV=production; node ~/luxcena-neo-install/src/app.js"
export NODE_ENV=production
node /home/lux-neo/install/src/app.js
