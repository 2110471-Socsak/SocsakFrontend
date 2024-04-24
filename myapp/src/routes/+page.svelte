<script lang="ts">
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
  let groupChatCount: Map<string, number> = new Map();
</script>

<div class="bg-slate-900 w-screen h-screen flex m-0">
  {#if !isLoading}
    <Menu bind:currentRoom bind:groupChatCount />
    <MessageChannel currentRoom={currentRoom} groupChatCount={groupChatCount} />
  {:else}
    <div class="flex-1 w-full h-full flex flex-col justify-center items-center">
      <span class="loading loading-dots w-12"></span>
    </div>
  {/if}
</div>
