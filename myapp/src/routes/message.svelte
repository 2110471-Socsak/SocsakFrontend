<script lang="ts" async>
  import type { Message } from "@/models/message";
  import { getAllMessages } from "../services/messages";
  import { onMount } from "svelte";

  let messageList: Message[] | null = null;
  let isGroup: boolean | null = null;
  let room: string | null = null;
  // const user = localStorage.getItem("user");

  onMount(async () => {
    // for test
    isGroup = true;
    room = isGroup ? "6620bfd00d614c3bcb28af13" : "gun2";

    const response = await getAllMessages(isGroup, room, 0, 10);
    messageList = response.data;
    console.log(messageList);

  });
</script>

<div class="w-full h-full justify-between pl-4 pr-12 py-8 flex flex-col">
  <header class="text-lg text-white h-12 inline-block align-middle">
    CP888 (10)
  </header>
  <div class="h-max">
    <div class="chat chat-start text-pretty">
      <div class="chat-bubble">
        It's over Anakin, <br />I have the high ground.
      </div>
    </div>
    <div class="chat chat-end text-pretty">
      <div class="chat-bubble">You underestimate my power!</div>
    </div>
  </div>
  <div class="flex gap-2">
    <input
      type="text"
      placeholder="Enter a message..."
      class="input input-bordered w-full h-12 m-0"
    />
    <button class="w-8 h-8">
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
