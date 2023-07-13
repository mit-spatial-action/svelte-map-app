<script>
  import data from '../instance.json'
  export let duration = 1.2;
  export let border = 5;
  export let color = data.accentColor
</script>

<style>
  .ripple,
  .ripple div {
    z-index: 1000;
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
    border: calc(var(--border) * 1px) solid var(--color);
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
  <div style="
    --color: {color}; 
    --duration: {duration}; 
    --border: {border};">
  </div>
  <div style="
    --color: {color}; 
    --duration: {duration}; 
    --border: {border}; 
    animation-delay: -{duration/2}s;">
  </div>
  <div style="
    --color: {color}; 
    --duration: {duration}; 
    --border: {border}; 
    animation-delay: -{duration/4}s;">
  </div>
</div>