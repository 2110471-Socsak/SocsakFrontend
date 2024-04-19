<script>
  const privateChatList = [
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666",
      "online": "true"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },
    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
     {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    {
      "id": "7",
      "username": "Jame",
      "timestamp": "1459361875666"
    },
    {
      "id": "8",
      "username": "Jack",
      "timestamp": "1459361875666"
    },    {
      "id": "6",
      "username": "Joe",
      "timestamp": "1459361875666"
    },
    
  ];
  const groupChatList = [
    {
      "id": "1",
      "title":"Test",
      "memberCount": 10,
      "timestamp": "1459361875666",
    },
    {
      "id": "2",
      "title":"Test2",
      "memberCount": 14,
      "timestamp": "1459361875666",
    },
    {
      "id": "3",
      "title":"Test3",
      "memberCount": 2,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },
    {
      "id": "4",
      "title":"Test4",
      "memberCount": 100,
      "timestamp": "1459361875666",
    },

  ];
  const user = {
    "userId": "Myro",
    "timestamp": "1459361875666"
  }
  const chat = {
  "id": "chat-id",
  "title": "Test",
  "messages": {
    "1": {
      "sender": "eclarke",
      "message": "ok let's make this happen",
      "timestamp": 1459361875337
    },
    "2": {
      "sender": "eclarke",
      "message": "ok let's make this happen",
      "timestamp": 1459361875337
    }
  }
}
</script>

<div class="bg-slate-900 w-screen h-screen flex m-0">
  <div class="w-1/5 h-sreen mr-auto bg-slate-900 z-10 overflow-hidden flex flex-col">
    <p class="sticky top-0 text-white text-2xl font-semibold p-8">Socsak</p>
    <div class="w-full h-full overflow-hidden flex flex-col px-4">
      <div class="collapse collapse-arrow join-item rounded-none overflow-hidden max-h-full min-h-14">
        <input type="radio" name="my-accordion-4" checked=true /> 
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
      Username: {user.userId} (you)
    </p>
  </div>
  <div class="w-full h-full justify-between pl-4 pr-12 py-8 flex flex-col">
    <header class="text-lg text-white h-12 inline-block align-middle">
      CP888 (10)
    </header>
    <div class="h-max">
      <div class="chat chat-start text-pretty">
        <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
      </div>
      <div class="chat chat-end text-pretty	">
        <div class="chat-bubble">You underestimate my power!</div>
      </div>
    </div>
    <input type="text" placeholder="Enter a message..." class="input input-bordered w-full h-12 m-0" />
  </div>
</div>