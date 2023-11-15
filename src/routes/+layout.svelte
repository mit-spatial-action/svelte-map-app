<script>
    import Navbar from '$lib/components/Navbar/Navbar.svelte';
    import site_data from '$lib/config/instance.json';
    import "$lib/styles/style.css";



</script>
<title>{site_data.title}</title>
<link rel="icon" type="image/x-icon" href={site_data.favicon}>
<Navbar pages={site_data.pages}/>
<slot/>
