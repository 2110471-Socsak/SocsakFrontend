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
    {title: 'Group1'},
    {title: 'Group2'},
    {title: 'Group3'},
    {title: 'Group4'},
    {title: 'Group5'},
    {title: 'Group6'},
    {title: 'Group7'},
    {title: 'Group8'},
    {title: 'Group9'},
    {title: 'Group10'},
    {title: 'Group11'},
    {title: 'Group12'},
    {title: 'Group13'},
    {title: 'Group14'},
    {title: 'Group15'},
    {title: 'Group16'},
    {title: 'Group17'},
    {title: 'Group18'},
    {title: 'Group19'},
    {title: 'Group20'},
  ]
</script>

<div class="w-1/5 h-sreen mr-auto bg-slate-900 z-10 overflow-hidden flex flex-col">
  <p class="sticky top-0 text-white text-2xl font-semibold p-8">Socsak</p>
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
  <p class="sticky bottom-0 text-white bg-slate-900 p-8">
    Username: {username} (you)
  </p>
</div>
