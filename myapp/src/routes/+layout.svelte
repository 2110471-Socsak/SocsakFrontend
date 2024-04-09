<script>
  import "../app.css";
  import '@fontsource-variable/public-sans';

</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
	font-family: 'Public Sans Variable', sans-serif;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  @media (min-width: 480px) {
  }
</style>
