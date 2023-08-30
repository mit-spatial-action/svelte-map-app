<script>
    function handleClick() {
      document.getElementById("navMenu").classList.toggle('is-active');
      document.getElementById("navbar-menu").classList.toggle('is-active');
    }
</script>

<button on:click={handleClick} class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false" data-target="navMenu">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
</button>