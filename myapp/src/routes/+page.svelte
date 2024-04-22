<script lang="ts">
  import { browser } from "$app/environment";
  import type { CurrentRoom } from "@/models/message";

  let isLoading: boolean = true;

  if (typeof window !== "undefined") {
    let user = localStorage.getItem("user");
    if (!user) window.location.href = "/auth";
    isLoading = false;
  }

  import Menu from "./menu.svelte";
  import MessageChannel from "./message.svelte";

  let currentRoom: CurrentRoom | null = null;
</script>

<div class="bg-slate-900 w-screen h-screen flex m-0">
  {#if !isLoading}
    <Menu bind:currentRoom />
    <MessageChannel {currentRoom} />
  {:else}
    <div class="flex-1 w-full h-full flex flex-col justify-center items-center">
      <span class="loading loading-dots w-32"></span>
    </div>
  {/if}
</div>
