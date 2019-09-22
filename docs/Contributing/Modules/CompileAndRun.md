## Index
---
## Locals

### var `pythonSupportFiles`

Points to the files for our python support code. They should be in a subdir of the module itself.

## Exported

### class `Python`

This is exported as Python, just so that we could add other languages later. Used to build and run python-scripts with our support-code.

### method `Python.constructor`

Takes one parameter, which is the full path to the folder where the script is located.

When initializing the class, this will be called. Can be done like this:

```javascript
new compileRun.Python(global.DirSwap + "/usrData/usrCode/example");
```

### method `Python.compile`

This deletes old build-folder, and makes a new one. It then moves all required files into the build-folder, making us ready for running the script.

### method `Python.run`

Spawns a new process, starting entry.py in our build-folder. It also attaches event-listners on our class-object. All of them is in the example below:

```javascript
let sc = new compileRun.Python(global.DirSwap + "/usrData/usrCode/example");
​
// When data is printed from the python-script
sc.on("stdout::data", (_stdout) => { });
// Last write when script closes, any exiting messages
sc.on("stdout::end", (_stdout) => { });
// When something is printed from the python-script to the error-out. Usually when a `throw` is called
sc.on("stderr::out", (_stderr) => { });
// Last words when process is dying from an error :`(
sc.on("stderr::end", (_stderr) => { });
// When script exits, _code is the exit-code
sc.on("close", (_code) => { });
```

## Python

This is the support-files for user-made scripts.

## Entry.py

The entry-point when running a script. A file called script.py, containing the user-script, should be placed next to this file. Starting it should be done like this (Where app-root is where our app.js is located):

```
python entry.py <pathToAppRoot>
```
