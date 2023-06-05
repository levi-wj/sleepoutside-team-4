<script>
  import { capitalize } from "../utils.mjs";
  export let crumbs;
</script>

<style>
  div {
    margin-bottom: 1em;
  }

  p {
      font-size: 12pt;
  }

  p i {
    font-size: 10pt;
  }

  a {
    color: var(--primary-color);
  }
</style>

<div>
  <p>
    {#each crumbs as crumb, i}
      {#if crumb.url}
        <a href={crumb.url}>{capitalize(crumb.text)}</a>
      {:else}
        {capitalize(crumb.text)}
      {/if}

      {#if i < crumbs.length - 1}
        <i class="fas fa-arrow-right"></i>&nbsp;
      {/if}
    {/each}
  </p>
</div>