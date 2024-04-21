<script lang="ts" async>
  import type { Message } from "@/models/message";
  import ChatBubble from "./chatBubble.svelte";
  export let messageList: Message[];
</script>

<div class="flex flex-col h-full p-8 pr-24 overflow-y-scroll">
  {#if messageList && messageList.length > 0}
    {#each messageList as message (message.id)}
      <ChatBubble {message} />
    {/each}
  {:else}
    <p>No messages to display.</p>
  {/if}
</div>
