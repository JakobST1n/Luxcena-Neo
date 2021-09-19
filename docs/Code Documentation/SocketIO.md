# SocketIO

## Client
Socketio is setup in the file `globals`.
This means, import `globals`, and then you can use `Socket` from there.

### Connect
1. Client first needs to get an Authentication token,
   this can be obtained by doing this:
   ```javascript
   import {setCookie} from "../../../cookies";
   let CryptoJS = require("crypto-js");
   let passwordHash = CryptoJS.SHA256(<PASSWORD>;).toString();

   Socket.emit("authenticate", <USERNAME>, passwordHash, (token) => {
       // Token will be a string if username/password combo is right,
       // if not, it is false.
       setCookie("session_token", token, 500);
   };)
   ```
2. Then the user can authenticate like this:
    ```javascript
    import {getCookie} from "../../../cookies";
    let cookieToken = getCookie("session_token");

    Socket.emit("authenticateToken", cookieToken, (res) => {
        // Res is true if we got authenticated,
        // If not, it is false.
    });
    ```
3. We are now authenticated, and all actions and events are available to the client.

### "Actions"
```javascript
Socket.emit(Action, *Arguments, (Return) => {
};)
```

##### NeoRuntime/status


| Name   | Type   | Description |
| ------ | ------ | ----------- |
| status | object |             |

??? info "Return/status"

    | Name           | Type    | Description                   |
    | -------------- | ------- | ----------------------------- |
    | currentScript  | string  | "None"/Name of current script |
    | scriptIsExited | boolean |                               |
    | uptime         | number  |                               |

##### NeoRuntime/Script/Create

??? info "Arguments"

    | Name       | Type   | Description                           |
    | ---------- | ------ | ------------------------------------- |
    | scriptPath | string | Path of the new script, local/example |

??? info "Return"

    | Name   | Type    | Description           |
    | ------ | ------- | --------------------- |
    | res    | boolean | success               |
    | resMsg | string  | if fail, errorMessage |


##### NeoRuntime/Script/Delete

??? info "Arguments"

    | Name       | Type   | Description                                 |
    | ---------- | ------ | ------------------------------------------- |
    | scriptPath | string | Path of the script to delete, local/example |

??? info "Return"

    | Name   | Type    | Description           |
    | ------ | ------- | --------------------- |
    | res    | boolean | success               |
    | resMsg | string  | if fail, errorMessage |

##### NeoRuntime/Script/Select

??? info "Arguments"

    | Name       | Type   | Description                                |
    | ---------- | ------ | ------------------------------------------ |
    | scriptPath | string | Path of the script to start, local/example |

##### NeoRuntime/Scripts/get

??? info "Return"

    | Name   | Type    | Description           |
    | ------ | ------- | --------------------- |
    | local  | list    | local scripts         |
    | remote | list    | remote scripts        |

### "Events"
```javascript
// Listen for a event
Socket.emit(event + "::join");
Socket.on(event, (*Return); => {

})
```
```javascript
// Stop listening for an event
Socket.emit(event + "::leave")
```


## Server
