<script lang="ts" async>
  import { onMount } from "svelte";
  import type { UsersResponse } from "../models/user";
  import type {
    Group,
    GroupsResponse,
    RoomCountUpdateData,
  } from "../models/group";
  import { getAllUser } from "../services/user";
  import { getAllGroup } from "../services/group";
  import { SocketClient } from "../socket/SocketClient";
  import { browser } from "$app/environment";
  import type { CurrentRoom } from "@/models/message";
  import { Socket } from "socket.io-client";

  export let currentRoom: CurrentRoom | null;
  export let groupChatCount: Map<string, number>;

  let username: string = "";

  let privateChatList: Map<string, boolean> = new Map();
  let groupChatName: Map<string, string> = new Map();

  if (typeof window !== "undefined") {
    username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).username
      : "Guest";
  }

  onMount(async () => {
    const usersRes: UsersResponse = await getAllUser();
    const newPrivateList = new Map();
    usersRes.data?.users.forEach((user) => {
      newPrivateList.set(user.username, user.online);
    });
    privateChatList = newPrivateList;
  });

  onMount(async () => {
    await fetchRoom();
  });

  async function fetchRoom() {
    const groupRes: GroupsResponse = await getAllGroup();
    const newNameMapper = new Map();
    const newCountMapper = new Map();
    groupRes.data?.forEach((group) => {
      newNameMapper.set(group.id, group.name);
      newCountMapper.set(group.id, group.count);
    });
    groupChatName = newNameMapper;
    groupChatCount = newCountMapper;
  }

  let ioClient: Socket | null = null;
  if (browser) {
    ioClient = SocketClient.getInstance();

    ioClient?.on("user_connected", (username: string) => {
      const newPrivateList = new Map(privateChatList);
      newPrivateList.set(username, true);
      privateChatList = newPrivateList;
    });

    ioClient?.on("user_disconnected", async (username: string) => {
      const newPrivateList = new Map(privateChatList);
      newPrivateList.set(username, false);
      privateChatList = newPrivateList;
      await fetchRoom();
    });

    ioClient?.on("group_created", (group: Group) => {
      const newNameMapper = new Map(groupChatName);
      const newCountMapper = new Map(groupChatCount);
      newNameMapper.set(group.id, group.name);
      newCountMapper.set(group.id, 0);
      groupChatName = newNameMapper;
      groupChatCount = newCountMapper;
    });

    ioClient?.on("room_count_updated", (room: RoomCountUpdateData) => {
      const newCountMapper = new Map(groupChatCount);
      if (newCountMapper.has(room.groupId)) {
        newCountMapper.set(room.groupId, room.count);
      }
      groupChatCount = newCountMapper;
    });
  }

  let createName: string;
  async function handleCreateGroup() {
    const ack = await ioClient?.emitWithAck("create_group", {
      name: createName,
    });
    createName = "";
    if (ack.id) {
      changeRoom(true, ack.id);
    }
  }

  function changeRoom(group: boolean, room: string) {
    const roomToJoin = {
      group,
      room,
    };
    ioClient?.emit("join_room", roomToJoin);
    if (group) {
      currentRoom = {
        group,
        room,
        name: groupChatName.get(room),
      };
    } else {
      currentRoom = {
        group,
        room,
      };
    }
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/auth";
    }
  }
</script>

<div
  class="w-1/4 h-sreen mr-auto bg-slate-900 z-10 overflow-hidden flex flex-col px-4"
>
  <p class="sticky top-0 text-white text-3xl font-semibold p-4 pt-8">Socsak</p>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <div
      class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14"
    >
      {#await privateChatList}
        <p>Loading...</p>
      {:then}
        {#if privateChatList}
          <input type="radio" name="my-accordion-4" checked={true}/>
          <p class="sticky collapse-title text-sm font-medium flex items-center gap-2">
            Chats <span>{privateChatList.size}</span>
          </p>
          <ul class="text-white collapse-content overflow-y-scroll scrollbar-hide">
            {#each [...privateChatList] as [username, online]}
              <button
                class={`h-12 w-full p-2 rounded text-sm md:text-base flex justify-between items-center gap-[6px] hover:bg-slate-800 hover:cursor-pointer
                  ${currentRoom?.room === username ? "bg-slate-700" : "bg-slate-900"}
                  `}
                on:click={() => changeRoom(false, username)}
              >
                {username}
                {#if online}
                  <span
                    class="badge badge-sm bg-transparent border-green text-green text-[10px]"
                    >Online</span
                  >
                {:else}
                  <span
                    class="badge badge-sm bg-transparent border-slate-400 text-slate-400 text-[10px]"
                    >Offline</span
                  >
                {/if}
              </button>
            {/each}
          </ul>
        {/if}
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
    <div
      class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-12"
    >
      {#await groupChatCount}
        <p>Loading...</p>
      {:then}
        {#if groupChatCount}
          <input type="radio" name="my-accordion-4"/>
          <p class="sticky collapse-title text-sm font-medium flex items-center gap-2 h-8 overflow-hidden">
            Groups <span>{groupChatCount.size}</span>
          </p>
          <ul class="w-full text-white collapse-content overflow-y-scroll scrollbar-hide pt-0 p-4 pb-8">
            {#each [...groupChatCount] as [id, count]}
              <button
                class={`w-full overflow-hidden text-ellipsis h-12 text-sm md:text-base flex gap-[6px] items-center p-2 rounded hover:bg-slate-800 hover:cursor-pointer 
                  ${currentRoom?.room === id ? "bg-slate-700" : "bg-slate-900"}
                  `}
                on:click={() => changeRoom(true, id)}
              >
                <p class="truncate">{groupChatName.get(id)}</p>
                <span>({count})</span>
              </button>
            {/each}
          </ul>
        {/if}
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
  </div>
  <div
    class="sticky bottom-0 text-white text-base bg-slate-900 pb-4 px-2 flex flex-col justify-between"
  >
    <form
    class="sticky flex flex-col justify-between items-center gap-2 pt-4 pb-6 border-slate-700  border-t-[1px]"
    on:submit={() => handleCreateGroup()}
      > 
      <div class="flex flex-row w-full text-slate-300 justify-between items-center">
      <p class=" text-base text-white h-[28px]">Create new group</p>
      <button
        class="flex items-center justify-center bg-blue-300 hover:bg-blue-500 rounded disabled:hidden py-[2px] px-[6px] gap-[2px] text-slate-900 text-[12px] font-medium"
        type="submit"
        disabled={!createName || createName === ""}
      >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2V10M10 6L2 6" stroke="#18191F" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Create
      </button>
      </div>
      <input
      class="input w-full h-10 bg-slate-800 text-white text-wrap p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-10"
      placeholder="Enter a group name..."
      bind:value={createName}
      />
    </form>
    <div class="flex w-full items-center border-t-[1px] border-slate-700 py-4 justify-between">
      <div class="flex flex-col gap-1">
        <p>Username : {username}</p>
      </div>
      <button
        class="w-fit inline-block bg-slate-600 rounded text-slate-300 text-sm h-[28px] py-1 px-2 hover:bg-red-500 hover:cursor-pointer hover:text-white focus:bg-red-500 focus:text-white"
        on:click={() => {
          handleLogout();
        }}
      >
        Log out
      </button>
    </div>
  </div>
</div>
