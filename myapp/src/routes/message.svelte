<script lang="ts">
  import { sendMessage } from "../socket/index";
  import { messagesStore } from "../services/messages";

  let messageInput = "";
  // const username = "imp";

  // function handleSubmit() {
  //   if (username) {
  //     sendMessage(messageInput, username);
  //   }
  //   messageInput = "";
  // }

  let listRef: HTMLElement | undefined;

  $: {
    console.log("hello?");

    if (listRef) {
      listRef.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }
</script>

<div class="w-full h-full justify-between pl-4 pr-12 py-8 flex flex-col">
  <header class="text-lg text-white h-12 inline-block align-middle">
    Name
  </header>

<main class="h-max">
  <div class="chat text-pretty">
    <ul bind:this={listRef}>
      {#each $messagesStore.reverse() as message}
        <li class="chat-bubble">
          <!-- {#if message.username === $idStore}
            <div />
          {/if} -->
<!-- 
          <p class="chat-bubble" class:user-message={message.userid === $idStore}>
            {message.content}
          </p> -->

          <!-- {#if message.userid !== $idStore}
            <div />
          {/if} -->
        </li>
      {/each}
    </ul>
  </div>

  <form class="input-container">
    <input type="text" placeholder="Enter a message..." class="input input-bordered w-full h-12 m-0" />
    <button  class="btn btn-active btn-primary" type="submit">Submit</button>
  </form>
</main>
</div>