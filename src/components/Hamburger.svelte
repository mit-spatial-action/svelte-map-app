<script>
    function handleClick() {
      document.getElementById("navMenu").classList.toggle('is-active');
    }
</script>

<button on:click={handleClick} class="navbar-burger" aria-label="menu" aria-expanded="false">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
</button>