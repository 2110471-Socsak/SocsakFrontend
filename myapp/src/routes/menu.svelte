<script lang="ts">
  const username = "imp"
  const privateChatList = [
    {username: 'User1', online: true},
    {username: 'User2', online: false},
    {username: 'User3', online: true},
    {username: 'User4', online: false},
    {username: 'User5', online: true},
    {username: 'User6', online: false},
    {username: 'User7', online: true},
    {username: 'User8', online: false},
    {username: 'User9', online: true},
    {username: 'User10', online: false},
    {username: 'User11', online: true},
    {username: 'User12', online: false},
    {username: 'User13', online: true},
    {username: 'User14', online: false},
    {username: 'User15', online: true},
    {username: 'User16', online: false},
    {username: 'User17', online: true},
    {username: 'User18', online: false},
    {username: 'User19', online: true},
    {username: 'User20', online: false},
  ]
  const groupChatList= [
    {title: 'Group1', count: 10},
    {title: 'Group2', count: 20},
    {title: 'Group3', count: 30},
    {title: 'Group4', count: 40},
    {title: 'Group5', count: 50},
    {title: 'Group6', count: 60},
    {title: 'Group1', count: 10},
    {title: 'Group2', count: 20},
    {title: 'Group3', count: 30},
    {title: 'Group4', count: 40},
    {title: 'Group5', count: 50},
    {title: 'Group6', count: 60},
  ]
</script>

<div class="w-1/4 h-sreen mr-auto bg-slate-900 z-10 overflow-hidden flex flex-col">
  <p class="sticky top-0 text-white text-2xl font-semibold p-8">Socsak</p>
  <div class="w-full h-full overflow-hidden flex flex-col ">
    <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14 px-4">
      <input type="radio" name="my-accordion-4" checked={true} /> 
      <p class="sticky collapse-title text-sm font-medium flex gap-[6px]">
        Chats <span>{privateChatList.length}</span>
      </p>
      <ul class="collapse-content overflow-scroll scrollbar-thin px-4"> 
        {#each privateChatList as item}
          {#if item.online}
          <li class="text-white h-12 text-sm md:text-base flex justify-between items-center">
            {item.username} 
            <span class="badge badge-sm border-green text-green text-[10px]">Online</span>
          </li>
          {:else}
          <li class="text-slate-400 h-12 text-sm md:text-base flex justify-between items-center">
            {item.username}
            <span class="badge badge-sm border-slate-400 text-slate-400 text-[10px]">Offline</span>
          </li>
          {/if}
        {/each}
      </ul>
    </div>
    <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14 px-4">
      <input type="radio" name="my-accordion-4"/> 
      <p class="sticky collapse-title text-sm font-medium flex gap-[6px] absolute">
        Groups <span>{groupChatList.length}</span>
      </p>
      <ul class="collapse-content overflow-scroll scrollbar-thin px-4"> 
        {#each groupChatList as item}
        <li class="text-white h-12 text-sm md:text-base flex items-center gap-1">
          {item.title}
          <span>({item.count})</span>
        </li>

        {/each}
      </ul>
    </div>
  </div>
  <p class="sticky bottom-0 text-white bg-slate-900 p-8">
    Username: {username} (you)
  </p>
</div>