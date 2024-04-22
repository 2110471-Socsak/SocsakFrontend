<script lang="ts" async>
  import type { CurrentRoom, Message } from "@/models/message";
  import { SocketClient } from "../socket/SocketClient";
  import { browser } from "$app/environment";
  import ChatPane from "../components/chat/chatPane.svelte";
  import { Socket } from "socket.io-client";
  import type { RoomCountUpdateData } from "@/models/group";

  export let currentRoom: CurrentRoom | null = null;
  let username: string = "";
  let messageInput: string = "";
  let groupChatCount: Map<string, number> = new Map();

  if (typeof window !== "undefined") {
    username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).username
      : "Guest";
  }

  let io: Socket | null = null;
  if (browser) {
    const io = SocketClient.getInstance();

    io?.on("room_count_updated", (room: RoomCountUpdateData) => {
      const newCountMapper = new Map(groupChatCount);
      if (newCountMapper.has(room.groupId)) {
        newCountMapper.set(room.groupId, room.count);
      }
      groupChatCount = newCountMapper;
      if (currentRoom?.room) {
        currentRoom = {
          group: currentRoom.group,
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

<div class="w-3/4 h-full justify-between p-8 pr-16 flex flex-col">
  <header
    class={`text-lg text-white inline-block align-middle border-b border-slate-800
    ${!currentRoom ? "hidden" : ""}`}
  >
    {#if currentRoom && currentRoom?.group && currentRoom?.name}
      {#await groupChatCount}
        <p>Loading...</p>
      {:then}
        <p class="text-xl font-medium w-full p-6 pt-0 h-auto overflow-hidden text-pretty break-words">
          {currentRoom.name} ({currentRoom.count}) </p>
      {:catch error}
        <p class="p-6 pt-0">Error: {error.message}</p>
      {/await}
    {:else if currentRoom != null && currentRoom?.room}
      <p class="p-6 pt-0">{currentRoom.room}</p>
    {/if}
  </header>
  <ChatPane {currentRoom} />
  {#if currentRoom}
  <div class="pr-8">
    <div class="flex gap-4 rounded-lg w-full items-center justify-center py-2 px-4 bg-slate-800">
      <input
        type="text"
        placeholder={"Enter a message..."}
        class="w-full min-h-10 m-0 text-white bg-slate-800 focus:outline-none action:none"
        bind:value={messageInput}
        on:keydown={(e) => {
          if (e.key === "Enter") sendMessage(messageInput);
        }}
      />
      <button
        class="w-9 h-9 flex items-center justify-center bg-blue-300 hover:bg-blue-500 rounded-[24px]"
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
            stroke="#18191F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
  {/if}
</div>

