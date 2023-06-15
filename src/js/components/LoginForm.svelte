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

<form on:submit={handleSubmit}>
    <label for="email" >email: </label>
    <input type="email" id="email" bind:value={email}>
    <label for="password">password: </label>
    <input type="password" id="password" bind:value={password}>
    <button type="submit">Submit</button>
  </form>