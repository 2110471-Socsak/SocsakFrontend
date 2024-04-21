<script lang="ts" async>
  import type { Message } from "@/models/message";
  import { getAllMessages } from "../services/messages";
  import { onMount } from "svelte";

  let messageList: Message[] | null = null;
  let isGroup: boolean | null = null;
  let room: string | null = null;
  // const user = localStorage.getItem("user");
  let username:string = "";

  if (typeof window !== 'undefined') {
    username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).username:"Guest";
  }

  onMount(async () => {
    // for test
    isGroup = true;
    room = isGroup ? "6620bfd00d614c3bcb28af13" : "gun2";

    const response = await getAllMessages(isGroup, room, 0, 10);
    messageList = response.data;
    console.log(messageList);

  });
</script>

<div class="w-full h-full justify-between p-8 pr-16 flex flex-col">
  <header class="text-lg text-white inline-block align-middle border-b border-slate-800">
    <p class="p-6 pt-0">CP888 (10)</p>
  </header>
  <div class="flex flex-col h-full p-8 pr-24">
    <div class="chat chat-start flex flex-col gap-2">
      <div class="chat-header">
        Obi-Wan Kenobi
      </div>
      <div class="chat-bubble">You were the Chosen One!</div>
      <time class="text-xs opacity-50">2 hour ago</time>
    </div>
    <div class="chat chat-end flex flex-col gap-2">
      <div class="chat-header">
        {username}(You)
      </div>
      <div class="chat-bubble">I loved you.</div>
      <time class="text-xs opacity-50">2 hour ago</time>
    </div>
  </div>
  <div class="flex gap-3 w-full items-center justify-center">
    <input type="text" placeholder="Enter a message..." class="input input-bordered w-full h-12 m-0 text-white" />
    <button class="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-[24px]">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.8335 11.6667L14.0002 3.5M14.0002 3.5L22.1668 11.6667M14.0002 3.5V24.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> 
    </button>
  </div>
</div>
