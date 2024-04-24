<script lang="ts" async>
  import type { Message } from "@/models/message";
  import { getTimeByTimestamp, isDayChange } from "../../utils/date";

  export let message: Message;
  export let changeUser: boolean;

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
  {#if changeUser}
    <div class="chat-header text-slate-100">{getSenderText()}</div>
  {/if}
  <div
    class={` flex ${isSelf ? "flex-row-reverse" : "flex-row"} gap-2 items-end`}
  >
    <div class="chat-bubble overflow-hidden text-pretty break-words bg-slate-700 text-slate-100 max-w-2xl">{message.message}</div>
    <time class="text-xs opacity-50 text-slate-300">{getTimeByTimestamp(message.sentAt)}</time>
  </div>
</div>
