<script>
  import {categories, getParam} from '../utils.mjs';

  let q = getParam('q');
  let searchBoxFocus = false;
  let activeSuggestion = 'tents';

  // Handle up, down, and enter to change the selected suggestion and submit the search
  function searchBoxKeyHandler(e) {
    if (q) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        changeActiveSuggestion('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        changeActiveSuggestion('up');
      } else if (e.key === 'Enter') {
        window.location.href = `/product-list/index.html?q=${q}&category=${activeSuggestion}`;
      }
    }
  }

  // Change the active suggestion based on the direction
  function changeActiveSuggestion(direction) {
    const suggestions = document.querySelectorAll('.suggestions a');

    [...suggestions].every(e => {
      if (e.dataset.value === activeSuggestion) {
        if (direction === 'down') {
          activeSuggestion = e.nextElementSibling.dataset.value;
        } else if (direction === 'up') {
          activeSuggestion = e.previousElementSibling.dataset.value;
        }
        // Return false to break out of the loop
        return false;
      } else {
        // Return true to continue the loop
        return true;
      }
    });
  }

  function setFocus(hasFocus) {
    if (hasFocus) {
      searchBoxFocus = true;
    } else {
      // Add a small delay to let the user click on the suggestion
      setTimeout(() => searchBoxFocus = false, 200);
    }
  }
</script>

<style>
  .search-bar {
    display: inline-block;
    position: relative;
    margin-right: 2em;
  }
  
  input {
    padding: 1em;
    padding-left: 2.75em;
    width: 100%;
    border-radius: 20px;
    border: 1px solid lightgray;
    min-width: 25em;
  }
  
  input:focus {
    border: 2px solid var(--primary-color);
    outline: none;
  }
  
  i {
    color: rgb(170, 170, 170);
  }
  .search-bar i {
    position: absolute;
    top: 27%;
    left: 10px;
  }

  .suggestions {
    position: absolute;
    background-color: rgba(250, 250, 250, 0.911);
    font-size: medium;
    border-radius: 10px;
    box-shadow: 2px 2px 4px #00000085
  }

  .suggestions a {
    color: black;
    text-decoration: none;
    display: block;
    border-bottom: 1px solid rgb(207, 207, 207);
  }
  .suggestions a:last-child {
    border-bottom: none;
  }

  .suggestions a div {
    padding: 1em;
    margin-bottom: .1me;
  }
  .suggestions a:first-child div {
    border-radius: 10px 10px 0 0;
  }
  .suggestions a:last-child div {
    border-radius: 0 0 10px 10px;
  }

  .suggestions a.active div {
    background-color: #ffe8d485;
  }

  .suggestions a i {
    transition-property: margin-left, margin-right;
    transition-duration: .1s;
    float: right;
    margin-left: 1em;
    margin-right: .25em;
  }
  .suggestions a.active i {
    color: var(--primary-color);
    margin-left: 1.4em;
    margin-right: -.15em;
  }
</style>

<div>
  <div class="search-bar">
    <i class="fa fa-search"></i>
    <input type="text" name="q" placeholder="Search" autocomplete="off"
      bind:value={q}
      on:keydown={searchBoxKeyHandler}
      on:focus={() => setFocus(true)}
      on:blur={() => setFocus(false)}
    />
  </div>
  <!-- Create the suggestion dropdown items if we have search text (q) and the input has focus -->
  {#if q && searchBoxFocus}
    <div class="suggestions">
      <!-- Create one suggestion for every category -->
      {#each categories as category}
        <a href="/product-list/index.html?category={category}&q={q}"
          class:active="{activeSuggestion === category}"
          on:mouseover={() => activeSuggestion = category}
          on:focus={() => activeSuggestion = category}
          data-value={category}
        >
          <div>
            Search
            <span style:color="var(--primary-color)">{q}</span>
            in {category}
            <i class="fa fa-arrow-right"></i>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>