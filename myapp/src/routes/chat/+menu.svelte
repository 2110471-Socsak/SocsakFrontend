<script lang="ts">
  import { privateChatList, groupChatList } from '@/stores';

</script>


<div class="w-full h-full overflow-hidden flex flex-col px-4">
  <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14">
    <input type="radio" name="my-accordion-4" checked={true} /> 
    <p class="sticky collapse-title text-sm md:text-base font-medium flex gap-[6px]">
      Chats <span>{privateChatList.length}</span>
    </p>
    <ul class="collapse-content overflow-scroll scrollbar-thin px-4 py-0"> 
      {#each privateChatList as item}
        {#if item.online}
        <li class="text-white font-medium h-8 text-sm md:text-base flex justify-between items-center">
          {item.username} <span class="badge badge-sm border-green text-green text-[10px]">Online</span>
        </li>
        {:else}
        <li class="text-slate-400 h-8 text-sm md:text-base flex justify-between items-center">{item.username}</li>
        {/if}
      {/each}
    </ul>
  </div>
  <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14">
    <input type="radio" name="my-accordion-4"/> 
    <p class="sticky collapse-title text-sm md:text-base font-medium flex gap-[6px] absolute">
      Groups <span>{groupChatList.length}</span>
    </p>
    <ul class="collapse-content overflow-scroll scrollbar-thin"> 
      {#each groupChatList as item}
      <li class="text-white p-1">{item.title}</li>
      {/each}
    </ul>
  </div>
</div>