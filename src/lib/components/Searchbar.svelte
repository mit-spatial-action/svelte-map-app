<script>
    //import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
   //import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
   import { getContext } from 'svelte';

    let searchText = '';

    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    function handleSearch() {
        dispatch('search', searchTerm);
     }

  </script>

  <div id="geocoder"></div>
