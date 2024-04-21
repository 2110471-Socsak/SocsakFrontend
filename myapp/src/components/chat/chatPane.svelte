<script lang="ts" async>
  import type { Message } from "@/models/message";
  import ChatBubble from "./chatBubble.svelte";
  import { getDate, isDayChange } from "../../utils/date";

  export let messageList: Message[];
</script>

<div class="flex flex-col-reverse h-full p-8 pr-24 overflow-y-scroll gap-4">
  {#if messageList && messageList.length > 0}
    {#each messageList as message, index (message.id)}
      <ChatBubble
        {message}
        changeUser={index < messageList.length - 1
          ? messageList[index + 1].sender != message.sender
          : true}
      />
      {#if index == messageList.length - 1 || isDayChange(messageList[index + 1].sentAt, message.sentAt)}
        <div
          class="self-center bg-slate-600 px-2 py-1 rounded-lg text-sm text-slate-100"
        >
          {getDate(message.sentAt)}
        </div>
      {/if}
    {/each}
  {:else}
    <p class="h-full flex items-center justify-center text-slate-300">
      Start the conversation now !
    </p>
  {/if}
</div>
