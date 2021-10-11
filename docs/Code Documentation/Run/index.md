# Run when developing
I have made a simple script, that can be run both on a rPI and a normal computer.
(You will obviously not get any script to do anything on you pc)

I have only tested this on my mac...

To start it run:
```bash
npm run dev
```
You have to run these commands beforehand:
```bash
npm i
pip3 install mkdocs mkdocs-gitbook pygments pymdown-extensions
```

!!! warning "Starting"
    It will when starting freak out a little. All the filewatchers fires an event for every file,
    they find for some reason. But node should be killed each time, and when you end up with
    only two processes, it should work as you'd expect.

This will create a folder named `tmp` in you working directory. where all the user-files will be stored.

## Build watcher.
It starts to watch these directories:
```
- /build/
```
If a change is detected, it runs:
```bash
mkdocs build
```

## Node watcher
It starts to watch these directories:
```
- src/ (Except /src/public/ and /src/js/)
- app.js
```

It then shuts down node and starts it again:
```bash
node app.js <WORKING_DIR>/tmp/
```

## webpack
It just starts this command, witch rebundles when anything is changed:
```bash
npx webpack -p -w --mode=development
```

## Inteface
- `fsWatch`-window: logs when one of the watchers (not webpack obv.) detects a filesystem-change. `NODE` means node-watcher, and `DOCS` means docs-watcher.
- `Actions`-window: Logs all events with processes, like starting one, when one exits, when we try to kill one etc.
- `Node`-window: Shows the output of node.
- `mkDocs`-window: Show the output from running mkDocs.
- `Active Processes`-table: Shows a table of currently active processes started by the app. Use arrow keys to navigate it.
- `Webpack`-window: Shows the output from our webpack-process.
!!! tip
    All the log-windows respond to holding your cursor over and scrolling.

### `Exit`
The script will exit when pressing `q`, `s`, `escape`, `Control+c`.
It will then send a kill signal to all processes, wait 10 seconds and then exit.

## Edit file-watchers.
Each of the file-watchers have explanatory names: `watcher_node` and `watcher_docs`.

To add files or paths they should watch, find the init of the variable, and modify that code:
```javascript
e.g.
let; watcher_node = chokidar.watch([
    "app.js",
    'src/'  // Add new entrys here

]).on('all', (event, path) => { // ...
```

For the node-watcher, specify paths it should ignore in the `path.includes` block.
