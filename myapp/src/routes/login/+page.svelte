<script lang="ts">
  import { Auth0Client, User } from '@auth0/auth0-spa-js';
  import { onMount } from 'svelte';

  const auth0 = new Auth0Client({
      domain: '<auth0 domain>',
      clientId: '<auth0 client id>'
  });

  let user: User | undefined;

  async function login() {
      await auth0.loginWithRedirect({
          authorizationParams: {
          redirect_uri: 'http://localhost:5173/'
          }
      })
  }

  async function logout() {
      await auth0.logout();
  }

  onMount(async () => {
      await auth0.handleRedirectCallback()
      .then(async () => {
          user = await auth0.getUser();
      })
      .catch(() => {
          console.log("not authenticated");
      });
  })

</script>

<form method="POST">
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
</form>

{#if user != undefined}
  <p>hello {user.nickname}</p>
{/if}