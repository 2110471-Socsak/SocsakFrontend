<script>
	import Header from './Header.svelte';
  import ToggleHome from './ToggleHome.svelte';
	import './styles.css';
</script>

<div class="app">
	<ToggleHome />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
  :global(body) {
    font-family: "Public Sans Variable", sans-serif;
  }
</style>
