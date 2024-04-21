<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import type { CurrentRoom } from "@/models/message";
  if (browser && !localStorage.getItem("user")) goto("/auth");

  import Menu from "./menu.svelte";
  import MessageChannel from "./message.svelte";

  let currentRoom: CurrentRoom | null = null;
</script>

<div class="bg-slate-900 w-screen h-screen flex m-0">
  <Menu bind:currentRoom />
  <MessageChannel {currentRoom} />
</div>
