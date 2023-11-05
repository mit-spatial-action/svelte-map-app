<script>
    //import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
   //import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    
    let searchText = '';

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function handleSearch() {
        dispatch('search', searchTerm);
     }

  </script>

<!-- <div class="field has-addons">
    <div class="control">
      <input class="input" type="text" placeholder="e.g. Corp name or address..." bind:value={searchText}>
    </div>
    <div class="control">
        <button class="button is-info" on:click={handleSearch}>Search</button>
    </div>
  </div> -->

  <div id="geocoder"></div>
