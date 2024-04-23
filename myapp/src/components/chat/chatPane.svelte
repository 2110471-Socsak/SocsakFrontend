<script lang="ts" async>
  import type { CurrentRoom, Message } from "@/models/message";
  import ChatBubble from "./chatBubble.svelte";
  import { getDate, isDayChange } from "../../utils/date";
  import { browser } from "$app/environment";
  import { SocketClient } from "../../socket/SocketClient";
  import { getAllMessages } from "../../services/messages";

  export let currentRoom: CurrentRoom | null = null;
  let messageList: Message[];
  let isLoadingChat: boolean = true;

  $: if (currentRoom) {
    let page = 0;
    let limit = 1000;
    isLoadingChat = true;
    getAllMessages(currentRoom.group, currentRoom.room, page, limit)
      .then((response) => {
        messageList = response.data;
        isLoadingChat = false;
      })
      .catch((error) => {});
  }

  if (browser) {
    const io = SocketClient.getInstance();

    io?.on("new_message", (message: Message) => {
      if (messageList.some(m => m.id === message.id)) return;
      const updateMessageList = [message, ...messageList];
      messageList = updateMessageList;
    });
  }
</script>

{#if currentRoom && isLoadingChat}
  <div class="flex-1 w-full h-full flex flex-col justify-center items-center">
    <span class="loading loading-dots w-12"></span>
  </div>
{:else}
  <div
    class="flex flex-col-reverse h-full p-8 pr-24 overflow-y-scroll scrollbar-hide gap-2"
  >
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
{/if}
