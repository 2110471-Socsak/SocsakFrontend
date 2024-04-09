<script>
  import "../app.css";
  import '@fontsource-variable/public-sans';

</script>

<div class="app flex flex-col min-h-screen ">
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
	font-family: 'Public Sans Variable', sans-serif;
  }
  @media (min-width: 480px) {
	
  }
</style>
