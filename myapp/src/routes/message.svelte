<script lang="ts" async>
  import type { CurrentRoom, Message } from "@/models/message";
  import { getAllMessages } from "../services/messages";
  import ChatBubble from "../components/chat/chatBubble.svelte";
  import { onMount } from "svelte";

  let messageList: Message[] | null = null;
  export let currentRoom: CurrentRoom | null = null;
  // const user = localStorage.getItem("user");
  let username: string = "";

  if (typeof window !== "undefined") {
    username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).username
      : "Guest";
  }

  onMount(async () => {
    // for test
    if (!currentRoom) {
      return;
    }

    const response = await getAllMessages(
      currentRoom.group,
      currentRoom.room,
      0,
      10
    );
    messageList = response.data;
    console.log(messageList);
  });
</script>

<div class="w-full h-full justify-between p-8 pr-16 flex flex-col">
  <header
    class="text-lg text-white inline-block align-middle border-b border-slate-800"
  >
    <p class="p-6 pt-0">{currentRoom?.room}</p>
  </header>
  <div class="flex flex-col h-full p-8 pr-24">
    {#if messageList && messageList.length > 0}
      {#each messageList as message (message.id)}
        <ChatBubble {message} />
      {/each}
    {:else}
      <p>No messages to display.</p>
    {/if}
  </div>
  <div class="flex gap-3 w-full items-center justify-center">
    <input
      type="text"
      placeholder="Enter a message..."
      class="input input-bordered w-full h-12 m-0 text-white"
    />
    <button
      class="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-[24px]"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.8335 11.6667L14.0002 3.5M14.0002 3.5L22.1668 11.6667M14.0002 3.5V24.5"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</div>
