<script lang="ts" async>
  import type { CurrentRoom, Message } from "@/models/message";
  import { getAllMessages } from "../services/messages";
  import { onMount } from "svelte";
  import { SocketClient } from "../socket/SocketClient";
  import { browser } from "$app/environment";
  import ChatPane from "../components/chat/chatPane.svelte";
  import { Socket } from "socket.io-client";
  import type { RoomCountUpdateData } from "@/models/group";

  let messageList: Message[] = [];
  export let currentRoom: CurrentRoom | null = null;
  let username: string = "";
  let messageInput: string = "";
  let groupChatCount: Map<string, number> = new Map();
  let isLoadingChat: boolean = true;

  if (typeof window !== "undefined") {
    username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).username
      : "Guest";
  }

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

  let io: Socket | null = null;
  if (browser) {
    const io = SocketClient.getInstance();

    io?.on("new_message", (message: Message) => {
      const updateMessageList = [message, ...messageList];
      messageList = updateMessageList;
    });

    io?.on("room_count_updated", (room: RoomCountUpdateData) => {
      const newCountMapper = new Map(groupChatCount);
      if (newCountMapper.has(room.groupId)) {
        newCountMapper.set(room.groupId, room.count);
      }
      groupChatCount = newCountMapper;
      if (currentRoom?.room) {
        currentRoom = {
        group : currentRoom.group,
        room: currentRoom.room,
        name: currentRoom.name,
        count: room.count,
      };
      }
    });
  }

  function sendMessage(message: string) {
    if (message.trim() == "") return;
    const io = SocketClient.getInstance();
    if (!currentRoom?.room) return;
    io?.emit("send_message", {
      group: currentRoom.group,
      room: currentRoom.room,
      message: message,
    });
    messageInput = "";
  }

</script>

<div class="w-full h-full justify-between p-8 pr-16 flex flex-col">
  <header
    class={`text-lg text-white inline-block align-middle border-b border-slate-800 ${!currentRoom ? "hidden" : ""}`}
  >
    {#if currentRoom && currentRoom?.group && currentRoom?.name}
      {#await groupChatCount}
        <p>Loading...</p>
      {:then}
        <p class="p-6 pt-0">{currentRoom.name} ({currentRoom.count})</p>
      {:catch error}
        <p class="p-6 pt-0">Error: {error.message}</p>
      {/await}
    {:else if currentRoom != null && currentRoom?.room}
      <p class="p-6 pt-0">{currentRoom.room}</p>
    {/if}
  </header>
  {#if currentRoom && isLoadingChat}
    <div class="flex-1 w-full h-full flex flex-col justify-center items-center">
      <span class="loading loading-dots w-12"></span>
    </div>
  {:else}
    <ChatPane messageList={messageList || []} />
  {/if}
  <div class="flex gap-3 w-full items-center justify-center">
    <input
      type="text"
      placeholder="Enter a message..."
      class="input w-full h-16 m-0 text-white"
      bind:value={messageInput}
      on:keydown={(e) => {
        if (e.key === "Enter") sendMessage(messageInput);
      }}
    />
    <button
      class="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-[24px]"
      on:click={() => sendMessage(messageInput)}
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
