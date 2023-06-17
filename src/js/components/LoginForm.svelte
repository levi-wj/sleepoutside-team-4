<script>
    import { getParam } from "../utils.mjs";
    import { login } from "../auth.mjs";
    const redirect = getParam("redirect");

    function handleSubmit(e) {
        e.preventDefault();
        login({email, password}, redirect);
    }

    let email;
    let password;
</script>

<style>
    div.body {
        padding: 1em;
        background-color: #fdf6ed;
        border-radius: 10px 10px 0 0;
        margin-top: .5em;
    }
    div.form-column {
        width: 25%;
        min-width: 15em;
        padding: 1em;
        margin: auto;
        background-color: rgb(248, 230, 206);
        border-radius: 10px;
        box-shadow: 0px 2px 4px 0px #00000033;
    }
    div.form-column h2 {
        margin-top: .2em;
        color: #3d3d3d;
    }
    div.form-column h2 i {
        font-size: .9em;
        margin-right: .3em;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        margin-bottom: 15px;
        padding: 1em;
        width: 100%;
        border-radius: 5px;
        border: 1px solid lightgray;
    }
    button {
        margin-top: 1em;
    }
</style>

<div class="logo">
    <img src="/images/tent.svg" alt="Tent logo">
    <a href="/index.html">Sleep<span class="highlight">Outside</span></a>
</div>
<div class="body">
    <div class="form-column">
        <h2><i class="fa fa-user"></i>Login</h2>
        <form on:submit={handleSubmit}>
            <input type="email" id="email" bind:value={email} placeholder="Email">
            <input type="password" id="password" bind:value={password} placeholder="Password">
            <button type="submit">Login</button>
        </form>
    </div>
</div>