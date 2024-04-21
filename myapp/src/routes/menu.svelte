<script lang="ts" async>
  import { onMount } from 'svelte';
  import type { User } from "../models/user";
  import type { Group } from "../models/group";
  import { getAllUser } from "../services/user";
  import { getAllGroup } from "../services/group";

  let username:string = "";
  let privateChatList: User|null = null;
  let groupChatList: Group|null = null;

  if (typeof window !== 'undefined') {
    username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).username:"Guest";
  }
  
  onMount(async () => {
    privateChatList = await getAllUser();
    console.log(privateChatList);
});

  onMount(async () => {
    groupChatList = await getAllGroup();
    console.log(groupChatList);
  });

</script>

<div class="w-1/5 h-sreen mr-auto bg-slate-900 z-10 overflow-hidden flex flex-col px-4">
  <p class="sticky top-0 text-white text-2xl font-semibold p-8">Socsak</p>
  <div class="w-full h-full overflow-hidden flex flex-col ">
    <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14 px-4">
      {#await privateChatList}
        <p>Loading...</p>
      {:then}
        {#if privateChatList }
          <input type="radio" name="my-accordion-4" checked={true} /> 
          <p class="sticky collapse-title text-sm font-medium flex gap-[6px]">
            Chats <span>{privateChatList.data.users.length}</span>
          </p>
            <ul class="collapse-content overflow-scroll scrollbar-thin px-4"> 
              {#each privateChatList.data.users as item}
                {#if item.online}
                  <li class="text-white h-12 text-sm md:text-base flex justify-between items-center">
                    {item.username} 
                    <span class="badge badge-sm border-green text-green text-[10px]">Online</span>
                  </li>
                {:else}
                  <li class="text-white h-12 text-sm md:text-base flex justify-between items-center">
                    {item.username}
                    <span class="badge badge-sm border-slate-400 text-slate-400 text-[10px]">Offline</span>
                  </li>
                {/if}
              {/each}
            </ul>
        {/if}
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
    <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14 px-4">
      {#await groupChatList}
        <p>Loading...</p>
      {:then}
        {#if groupChatList}
          <input type="radio" name="my-accordion-4"/>           
          <p class="sticky collapse-title text-sm font-medium flex gap-[6px]">
            Groups <span>{groupChatList.data.length}</span>
          </p>
            <ul class="collapse-content overflow-scroll scrollbar-thin px-4"> 
              {#each groupChatList.data as item}
              <li class="text-white h-12 text-sm md:text-base flex gap-[6px] items-center">
                {item.name}
                <span>({item.count})</span>
              </li>
              {/each}
            </ul>
        {/if}
      {:catch error}
        <p>{error}</p>
      {/await}
    </div>
  </div>
  <div class="sticky bottom-0 text-white text-base bg-slate-900 pt-4 p-8  flex flex-col gap-1 border-t-[1px] border-slate-700">
    <p> Username : {username} </p>
    <p class="text-green text-sm"> (You are online) </p>
  </div>
</div>