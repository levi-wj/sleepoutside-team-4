<script>
  export let message;
  let alerts = [];

  for (const key in message) {
    alerts.push(message[key]);
  }

  function deleteMe(i) {
    alerts.splice(i, 1);
    alerts = alerts;
  }
</script>

<style>
  p, i {
    font-weight: 600;
  }
  .alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0a868;
    border: 2px solid #ec9c56;
    padding: 0 1em 0 1em;
  }
</style>

<div>
  {#each alerts as alert, i}
    <div class="alert"><p>{alert}</p><i on:click={() => {deleteMe(i)}} class="fa fa-x"></i></div>
  {/each}
</div>