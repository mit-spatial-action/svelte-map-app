<script>
    import Navbar from '$lib/Navbar.svelte';
    import data from '$lib/config/instance.json'
    import "bulma/css/bulma.css";
</script>
    <Navbar pages={data.pages}/>
<slot />