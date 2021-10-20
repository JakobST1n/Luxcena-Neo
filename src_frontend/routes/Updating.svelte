<script>
	import { openSocket, authorizedSocket } from "../stores/socketStore";

    let hasError = false;
    let updateLog = "";
    let step = "";
    let command = "";

    openSocket.on("updater", (event) => {
        if (event == "end") {
            if (!hasError) {
                console.log("END UPDATE");
                window.location.href = "/";
            }
        }
    });
    authorizedSocket.on("updater:step", (_step) => {
        step = _step;
    });
    authorizedSocket.on("updater:command", (_command) => {
        command = _command;
    });
    authorizedSocket.on("updater:error", (_updateLog) => {
        hasError = true;
        updateLog = _updateLog.join("\n");
    });

</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        &:before, &:after {
            box-sizing: inherit;
        }
    }
    .wrapper {
      background-color: #1fa2ed;
      color: #fff;
      height: 100vh;
    }

    .start-screen {
      display: flex;
      justify-content: center;
      flex-flow: nowrap column;
      align-items: center;
      min-height: 100vh;
    }
    .loading {
        display: flex;
        margin: 24px 0;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 0 5px 0 5px;
    }
    .loading__element {
      font: normal 100 2rem/1 Roboto;
      letter-spacing: .5em;
    }
    [class*="lett"] {
      animation: bouncing 3s infinite ease;
    }

    @for $i from 1 through 19 {
      $delay: percentage($i);
      .lett#{$i} {
        animation-delay: $delay / 1000% + s;
      }
    }

    @keyframes bouncing {
      0%, 100% {
        transform: scale3d(1,1,1);
      }
      50% {
        transform: scale3d(0,0,1);
      }
    }

    .current-event {
        color: rgba(255, 255, 255, 0.53);
        font: normal 100 1rem/1 Roboto;
        letter-spacing: .1em;
        width: 100%;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 5px;
        .small {
            font-size: 0.7rem;
            margin-top: 5px;
        }
    }

    .update-log { display: none; }

    .has-error {
        background-color: #6e2929;
        .start-screen, .current-event { display: none; }
        .update-log {
            display: block;
            position: absolute;
            width: 90vw;
            height: 70vh;
            background-color: #282828;
            border-radius: 15px;
            padding: 15px;
            overflow: auto;
            margin-left: 5vw;
            margin-top: 15vh;
            box-sizing: border-box;
        }
    }

</style>

<div class="wrapper" class:has-error={hasError}>
    <div class="start-screen">
        <div class="loading">
            <div class="loading__element lett1">L</div>
            <div class="loading__element lett2">U</div>
            <div class="loading__element lett3">X</div>
            <div class="loading__element lett4">C</div>
            <div class="loading__element lett5">E</div>
            <div class="loading__element lett6">N</div>
            <div class="loading__element lett7">A</div>
            <div class="loading__element lett8">&#0160;</div>
            <div class="loading__element lett9">I</div>
            <div class="loading__element lett10">S</div>
            <div class="loading__element lett11">&#0160;</div>
            <div class="loading__element lett12">U</div>
            <div class="loading__element lett13">P</div>
            <div class="loading__element lett14">D</div>
            <div class="loading__element lett15">A</div>
            <div class="loading__element lett16">T</div>
            <div class="loading__element lett17">I</div>
            <div class="loading__element lett18">N</div>
            <div class="loading__element lett19">G</div>
        </div>
        <div class="current-event">
            <p>{step}</p>
            <p class="small">{command}</p>
        </div>
    </div>
    <div class="update-log">
        Update failed (<a href="/">Go home</a>):
        <pre>
            {updateLog};
        </pre>
    </div>
</div>