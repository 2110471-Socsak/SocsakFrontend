<script lang="ts" async>
  import type { Message } from "@/models/message";

  export let message: Message;

  let username: string = "";
  let isSelf = false;

  if (typeof window !== "undefined") {
    username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!).username
      : "Guest";
    isSelf = username == message.sender;
  }

  function getSenderText() {
    return isSelf ? `${message.sender} (You)` : message.sender;
  }
</script>

<div class={`${isSelf ? "chat-end" : "chat-start"} flex flex-col gap-2"`}>
  <div class="chat-header">{getSenderText()}</div>
  <div class="chat-bubble">{message.message}</div>
  <time class="text-xs opacity-50">{message.sentAt}</time>
</div>
