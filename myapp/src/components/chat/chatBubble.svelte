<script lang="ts" async>
  import type { Message } from "@/models/message";
  import { getTimeByTimestamp } from "../../utils/date";

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

<div class={`${isSelf ? "chat-end" : "chat-start"} flex flex-col gap-2`}>
  <div class="chat-header">{getSenderText()}</div>
  <div class={` flex ${isSelf ? "flex-row-reverse" : "flex-row"} gap-2 items-center`}>
    <div class="chat-bubble">{message.message}</div>
    <time class="text-xs opacity-50 ">{getTimeByTimestamp(message.sentAt)}</time>
  </div>
</div>
