<script>
    import Button from "../ComponentLib/Button/Button.svelte";
	import { authenticate } from "../stores/socketStore";

    let isLoading = false;

    let username;
    let password;

    let errorMessage = null;

    function tryLogin() {
        isLoading = true;
        authenticate(username, password, (success) => {
            if (!success) {
                errorMessage = "Username/password incorrect";
                setTimeout(() => {
                    errorMessage = null;
                }, 5000);
            }
            isLoading = false;
        });
    }
</script>

<style>
    main {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background-color: #3c3b3b;
		text-align: center;
    }
    .login {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: white;
        border-radius: 15px;
        max-width: 200px;
        box-sizing: border-box;
    }
    img {
        margin-bottom: -18px;
        margin-top: -5px;
    }
    form {
        padding: 15px;
        padding-top: 0;
        text-align: left;
    }
    h2 {
        margin: 0;
    }
    input {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
        box-sizing: border-box;
        border: none;
        padding: 10px 15px;
        background: var(--grey-200);
        border-radius: 5px;
    }
    label {
        font-size: 12px;
        color: var(--grey-600);
        margin-bottom: 5px;
    }
    .error-message {
        color: var(--red-500);
        font-size: 12px;
        margin: 15px;
        margin-top: 0;
    }
</style>

<main>
    <div class="login">
        <img src="./assets/img/logo/Icon-192h.png" alt="">
        <!-- <h2>Luxcena neo Login</h2> -->
        <form on:submit|preventDefault={tryLogin}>
            <label for="username">Username</label>
            <input type="text" id="username" autocomplete="username" minlength="1" required bind:value={username} />

            <label for="password">Password</label>
            <input type="password" id="password" autocomplete="current-password" minlength="1" required bind:value={password} />

            <Button fullWidth=true>
                {#if isLoading}
                <i class="fas fa-spinner fa-pulse"></i>
                {:else}
                Login
                {/if}
            </Button>
        </form>

        {#if errorMessage}
        <div class="error-message">
        {errorMessage}
        </div>
        {/if}

    </div>
</main>