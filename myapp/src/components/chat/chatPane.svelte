<script lang="ts" async>
  import type { Message } from "@/models/message";
  import ChatBubble from "./chatBubble.svelte";
  import { getDate, isDayChange } from "../../utils/date";

  export let messageList: Message[];
</script>

<div class="flex flex-col h-full p-8 pr-24 overflow-y-scroll gap-4">
  {#if messageList && messageList.length > 0}
    {#each messageList as message, index (message.id)}
      {#if index == 0 || isDayChange(messageList[index - 1].sentAt, message.sentAt)}
        <div class="self-center bg-slate-600 px-2 py-1 rounded-lg text-sm text-slate-100">{getDate(message.sentAt)}</div>
      {/if}
      <ChatBubble
        {message}
        changeUser={index > 0
          ? messageList[index - 1].sender != message.sender
          : true}
      />
    {/each}
  {:else}
    <p>No messages to display.</p>
  {/if}
</div>
