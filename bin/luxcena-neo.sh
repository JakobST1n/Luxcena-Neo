#!/bin/bash

# We want to eventually run the server as another user than root. But right now,
# the python script needs to be run as root, and since the server is starting them
# the server needs root as well.

#runuser -l pi -c "export NODE_ENV=production; node ~/luxcena-neo-install/src/app.js"

set -o pipefail

# Root directory of the installation
BASEDIR=$(dirname $(dirname "$0"))
SYSTEMD_SRC_FILE="$BASEDIR/bin/luxcena-neo.service"
SYSTEMD_DEST_FILE="/etc/systemd/system/luxcena-neo.service"

echo "Verifying that we are running the newest systemd service file"
SYSTEMD_TMP=$(mktemp)
sed "s|{{WD}}|$BASEDIR|" "$SYSTEMD_SRC_FILE" > "$SYSTEMD_TMP"

if [[ -f "$SYSTEMD_DEST_FILE" ]] && cmp -s "$SYSTEMD_TMP" "$SYSTEMD_DEST_FILE"; then
    echo "Newest service file installed."
    rm "$SYSTEMD_TMP"
else
    echo "Serice file not up to date, attempting to update."
    cp "$SYSTEMD_TMP" "$SYSTEMD_DEST_FILE"
    rm "$SYSTEMD_TMP"
    systemctl daemon-reload
    systemctl enable luxcena-neo
    systemctl restart luxcena-neo
    echo "Service file updated, exiting with the hopes that the new file will automatically restart luxcena-neo."
    exit 0
fi

echo "Starting luxcena-neo"
export NODE_ENV=production
node "$BASEDIR/app.js" >> /var/log/luxcena-neo/service.log 2>&1
echo "Luxcena neo exited $?"
