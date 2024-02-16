<script>
    //import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
   //import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
   import { getContext, onDestroy, onMount} from 'svelte';

    let searchText = '';

    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    function handleSearch() {
        dispatch('search', searchTerm);
     }

     onDestroy(() => {
        console.log("destroyed");
     });

     onMount(()=>{
        console.log("mounted");
     });


  </script>

  <div id="geocoder"></div>
