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
  import { Socket, io } from "socket.io-client";

  export let currentRoom: CurrentRoom | null;

  let username: string = "";
  let privateChatList: Map<string, boolean> = new Map();
  let groupChatName: Map<string, string> = new Map();
  let groupChatCount: Map<string, number> = new Map();

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

    ioClient?.on("room_count_updated", (room: RoomCountUpdateData) => {
      const newCountMapper = new Map(groupChatCount);
      if (newCountMapper.has(room.groupId)) {
        newCountMapper.set(room.groupId, room.count);
      }
      groupChatCount = newCountMapper;
    });
  }

  function changeRoom(group: boolean, room: string) {
    currentRoom = { group, room };
    ioClient?.emit("join_room", currentRoom);
  }
</script>

<div
  class="w-1/5 h-sreen mr-auto bg-slate-900 z-10 overflow-hidden flex flex-col px-4"
>
  <p class="sticky top-0 text-white text-2xl font-semibold p-8">Socsak</p>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <div
      class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14 px-4"
    >
      {#await privateChatList}
        <p>Loading...</p>
      {:then}
        {#if privateChatList}
          <input type="radio" name="my-accordion-4" checked={true} />
          <p class="sticky collapse-title text-sm font-medium flex gap-[6px]">
            Chats <span>{privateChatList.size}</span>
          </p>
          <ul class="collapse-content overflow-scroll scrollbar-thin px-4">
            {#each [...privateChatList] as [username, online]}
              {#if online}
                <button
                  class="text-white h-12 text-sm md:text-base flex justify-between items-center gap-[6px]"
                  on:click={() => changeRoom(false, username)}
                >
                  {username}
                  <span
                    class="badge badge-sm border-green text-green text-[10px]"
                    >Online</span
                  >
                </button>
              {:else}
                <button
                  class="text-white h-12 text-sm md:text-base flex justify-between items-center gap-[6px]"
                  on:click={() => changeRoom(false, username)}
                >
                  {username}
                  <span
                    class="badge badge-sm border-slate-400 text-slate-400 text-[10px]"
                    >Offline</span
                  >
                </button>
              {/if}
            {/each}
          </ul>
        {/if}
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
    <div
      class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14 px-4"
    >
      {#await groupChatCount}
        <p>Loading...</p>
      {:then}
        {#if groupChatCount}
          <input type="radio" name="my-accordion-4" />
          <p class="sticky collapse-title text-sm font-medium flex gap-[6px]">
            Groups <span>{groupChatCount.size}</span>
          </p>
          <ul class="collapse-content overflow-scroll scrollbar-thin px-4">
            {#each [...groupChatCount] as [id, count]}
              <button
                class="text-white h-12 text-sm md:text-base flex gap-[6px] items-center"
                on:click={() => changeRoom(true, id)}
              >
                {groupChatName.get(id)}
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
    class="sticky bottom-0 text-white text-base bg-slate-900 pt-4 p-8 flex flex-col gap-1 border-t-[1px] border-slate-700"
  >
    <p>Username : {username}</p>
    <p class="text-green text-sm">(You are online)</p>
  </div>
</div>
