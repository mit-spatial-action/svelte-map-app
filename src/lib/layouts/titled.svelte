<script>
    export let title;
    // export let date
</script>
<div class = "container">
    <div class = "section">
        <h1 class="title">{title}</h1>
    </div>
    <hr>
    <div class = "section">
        <slot />
    </div>
</div>