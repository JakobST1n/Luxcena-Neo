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
#### `sudo lux-neo uninstall`
Uninstall the whole thing. You will have to remove this script yourself.
#### `sudo lux-neo update`
Update to the newest version on the current branch.
#### `sudo lux-neo conf`
Open the strip-config in `nano`.
#### `sudo lux-neo start`
Start the server.
#### `sudo lux-neo stop`
Stop the server.
