<script>
  export let message;
  let alerts = [];

  if (typeof(message) === 'object') {
    for (const key in message) {
      alerts.push(message[key]);
    }
  } else {
    alerts.push(message);
  }

  function deleteMe(i) {
    alerts.splice(i, 1);
    alerts = alerts;
  }
</script>

<style>
  i {
    font-weight: 600;
    cursor: pointer;
  }
  .alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0a868;
    border: 2px solid #ec9c56;
    padding: 0 1em 0 1em;
  }
  .alert p {
    font-weight: 600;
    font-size: 1rem;
  }
</style>

<div>
  {#each alerts as alert, i}
    <div class="alert"><p>{alert}</p><i on:click={() => {deleteMe(i)}} class="fa fa-x"></i></div>
  {/each}
</div>