<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  if (browser && !localStorage.getItem("user")) goto("/auth");
</script>

<h1 class="underline">Hello and welcome to my site!</h1>
<div>TO DO: implement chat page</div>