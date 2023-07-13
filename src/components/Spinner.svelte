<script>
  export let duration = 1;
  export let border = 4;
</script>

<style>
  .ripple,
  .ripple div {
    box-sizing: border-box;
  }
  .ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .ripple div {
    position: absolute;
    border: calc(var(--border) * 1px) solid currentColor;
    opacity: 1;
    border-radius: 50%;
    animation: ripple calc(var(--duration) * 1s) cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 8px;
      height: 8px;
      opacity: 1;
    }
    100% {
      top: 0;
      left: 0;
      width: 80px;
      height: 80px;
      opacity: 0;
    }
  }
</style>

<div class="ripple">
  <div style="--duration: {duration}; --border: {border};">
  </div>
  <div style="--duration: {duration}; --border: {border}; animation-delay: -{duration/2}s;">
  </div>
  <div style="--duration: {duration}; --border: {border}; animation-delay: -{duration/4}s;">
  </div>
</div>