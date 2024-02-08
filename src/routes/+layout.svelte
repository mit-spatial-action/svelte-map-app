<script>
    import site_data from '$lib/config/instance.json';
    import "$lib/styles/style.css";
    import Menu from '$lib/components/Navbar/Menu.svelte';
</script>
<title>{site_data.title}</title>
<link rel="icon" type="image/x-icon" href={site_data.favicon}>
<Menu />
<slot/>
