# Command line interface
---

This gets installed in the `/usr/bin` directory, and can be called by:
```bash
$ luxcena-neo.sh
```
or is alias
```bash
$ lux-neo
```
{% hint style='danger' %}
This CLI assumes root access, so please run it with `sudo`
{% endhint %}

## Options
### `sudo lux-neo uninstall`
Uninstall the whole thing. You will have to remove this script yourself.

### `sudo lux-neo update (skipNode)`
Update to the newest version on the current branch.
If `skipNode` is the second argument, `npm` won't be run.

### `sudo lux-neo conf`
Open the strip-config in `nano`.

### `sudo lux-neo start (boot)`
Start the server.
If you add `boot`, it will start when the system boots:
```bash
sudo lux-neo start boot
```

### `sudo lux-neo stop (boot)`
Stop the server.
If you add `boot`, it will *NOT* start when the system boots:
```bash
sudo lux-neo start boot
```

### `sudo lux-neo status`
This will output the status of the app. First it reports if the service is running,
and some general info. Then it prints the systemd-status report.

Example output:
```text
Luxcena-neo-cli [args: 'status']

╭─────────────────────╮
│ Service active: yes │
│ Starts on boot: yes │
│ Has failed:     no  │
╰─────────────────────╯

━━━Service status━━━━━━━━━━━━━━━━━━
● luxcena-neo.service - Luxcena Neo
   Loaded: loaded (/etc/systemd/system/luxcena-neo.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2018-12-05 22:55:28 UTC; 6min ago
 Main PID: 2365 (luxcena-neo.sh)
   CGroup: /system.slice/luxcena-neo.service
           ├─2365 /bin/bash /home/lux-neo/src/bin/luxcena-neo.sh
           └─2367 node /home/lux-neo/src/app.js

Dec 05 22:55:28 LUXCENA-STUE-SKAP systemd[1]: Started Luxcena Neo.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### `sudo lux-neo log service/app`
This shows the last 20 lines of the chosen log-file. And stays open to show
all new entries.

Example output:
```text
Luxcena-neo-cli [args: 'log app']

━━━App log (press ctrl+c to exit)━━━━━━━━━━━━━━━━━━
[3.11.2018 23:5:21:401] EVENT Starting Luxcena-Neo...
[3.11.2018 23:5:22:462] SUCCESS Webserver now listening at *:8080
```

### `sudo lux-neo version`
Currently not really doing anything usefull apart from showing which branch you are on.

Example output:
```text
Luxcena-neo-cli [args: 'version']

╭─────────────────────╮
│ Version: Unknown    │
│ branch : dev    │
╰─────────────────────╯
```
### `sudo lux-neo selectBranch <branch>`
This will change what branch you are on to <branch>. Stashing changes (shouldn't be a concern, but just saying it anyways).

*Please note that the version-checker now will just be useless, as it does not now what branch we really are on.*
