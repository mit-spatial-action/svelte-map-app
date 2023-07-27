<script>
    import Navbar from '$lib/Navbar.svelte';
    import site_data from '$lib/config/instance.json'
    import "bulma/css/bulma.css";
</script>
    <Navbar pages={site_data.pages}/>
<slot />