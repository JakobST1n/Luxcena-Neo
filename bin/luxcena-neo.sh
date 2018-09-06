#!/bin/bash

runuser -l pi -c "export NODE_ENV=production; node ~/luxcena-neo-install/src/app.js"
