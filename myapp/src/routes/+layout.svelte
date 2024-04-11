<script>
  import "../app.css";
</script>

<main class="app flex flex-col min-h-screen bg-slate-900">
  <slot />
</main>

<style>
  :global(body) {
    /* font-family: "Public Sans Variable", sans-serif; */
  }
</style>