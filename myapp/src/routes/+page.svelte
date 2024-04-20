<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  if (browser && !localStorage.getItem("user")) goto("/auth");

  import Menu from './menu.svelte';
  import MessageChannel from './message.svelte'; 
</script>
<div class="bg-slate-900 w-screen h-screen flex m-0">
  <!-- <Menu /> -->
  <MessageChannel />
</div>