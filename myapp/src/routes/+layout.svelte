<script>
  import "../app.css";
  import "@fontsource-variable/public-sans";
</script>

<main class="app flex flex-col min-h-screen bg-slate-900">
  <slot />
</main>

<style>
  :global(body) {
    font-family: "Public Sans Variable", sans-serif;
  }
</style>
