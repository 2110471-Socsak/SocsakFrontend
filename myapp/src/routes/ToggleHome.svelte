<script>
	import { page } from '$app/stores';
</script>

<ul>
  <li aria-current={$page.url.pathname === '/login' ? 'page' : undefined}>
    <a href="/login">Log In</a>
  </li>
  <li aria-current={$page.url.pathname === '/signup' ? 'page' : undefined}>
    <a href="/signup">Sign Up</a>
  </li>
</ul>