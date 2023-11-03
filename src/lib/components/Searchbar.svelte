<script>
    let searchText = '';
  </script>

<div class="field has-addons">
    <div class="control">
      <input class="input" type="text" placeholder="e.g. Corp name or address..." bind:value={searchText}>
    </div>
    <div class="control">
      <p class="button is-info">
        Search
      </p>
    </div>
  </div>