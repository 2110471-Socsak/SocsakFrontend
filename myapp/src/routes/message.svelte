<script lang="ts" async>
  import { validateMessage } from "../models/message";
  import { sendMessage } from "../socket/index";
  import { onMount } from 'svelte';
  import { getAllUser } from "../services/user";
  import type { Message } from "../models/message";
  import type { User } from "../models/user";

  // const user = localStorage.getItem("user");

</script>