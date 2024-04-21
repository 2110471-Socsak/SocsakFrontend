<script lang="ts" async>
  import { validateMessage } from "../models/message";
  import { sendMessage } from "../socket/index";
  import { messagesStore } from "../services/messages";
  import { onMount } from 'svelte';
  import { getAllUser } from "../services/user";
  import type { Message } from "../models/message";
  import type { User } from "../models/user";

  const user = getAllUser();
</script>

{#await user}
  <p>Loading...</p>
{:then user}
  {#if user}
    <ul>
      {#each user.data.users as item}
        <li>{item.username}</li>
      {/each}
    </ul>
  {/if}
{:catch error}
  <p>{error}</p>
{/await}