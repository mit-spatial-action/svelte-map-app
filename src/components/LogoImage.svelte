<script>
    export let name;
    export let url;
    export let logo;
    export let width = 15
</script>

<style>
    img {
        padding: 0.75em;
    }
</style>


<a href="{url}"><img src={logo} style="width: {width}em;" alt="{name} Logo" /></a>