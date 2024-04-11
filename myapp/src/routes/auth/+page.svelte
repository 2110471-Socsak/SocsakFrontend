<script lang="ts">
  import { onMount } from "svelte";
  // import type { ActionData } from "./$types";
  import { goto } from "$app/navigation";

  //====================STATE==========================//
  const selectedStyle =
    "w-fit px-4 py-2 text-blue-300 border-b-[1.5px] border-blue-300";
  const defaultStyle = "w-fit px-4 py-2 text-slate-400";

  let state: "login" | "signup" = "login";
  let username: string = "";
  let password: string = "";
  let error: string = "";

  function handleClickLogin() {
    state = "login";
    console.log(`State: ${state}`);
    clearInput();
  }

  function handleClickSignup() {
    state = "signup";
    console.log(`State: ${state}`);
    clearInput();
  }

  function clearInput() {
    username = "";
    password = "";
    error = "";
  }

  async function handleOnSubmit() {
    switch (state) {
      case "login": {
        console.log("username", username);
        console.log("password", password);
        console.log("login user...");

        await new Promise((resolve) => setTimeout(resolve, 1000));
        // const response = await fetch("/api/add", {
        //   method: "POST",
        //   body: JSON.stringify({ username, password }),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        // });
        console.log("User login successfully");
        // const res = await response.json();
        const res = {
          success: false,
          error: "The usename or password is incorrect.",
        };

        if (res.success) goto("/");
        else error = res.error;
      }
      case "signup": {
        console.log("username", username);
        console.log("password", password);
        console.log("register user...");

        await new Promise((resolve) => setTimeout(resolve, 1000));
        // const response = await fetch("/api/add", {
        //   method: "POST",
        //   body: JSON.stringify({ username, password }),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        // });
        console.log("User register successfully");
        // const res = await response.json();
        const res = {
          success: false,
          error: "This username has been used. Please try another.",
        };

        if (res.success) goto("/");
        else error = res.error;
      }
    }
  }
</script>

<div
  class="w-screen h-screen flex self-center items-center justify-center"
>
  <form
    on:submit={handleOnSubmit}
    class="w-11/12 md:w-fit h-fit flex justify-center p-6 md:px-12 md:py-8 bg-slate-800 flex-col gap-4 md:gap-8 rounded-lg items-center"
  >
    <div class="w-full flex justify-center text-base">
      <button
        on:click={handleClickLogin}
        type="button"
        class={state === "login" ? selectedStyle : defaultStyle}>
        Login
      </button>
      <button
        on:click={handleClickSignup}
        type="button"
        class={state === "signup" ? selectedStyle : defaultStyle}
      >
        Sign Up
      </button>
    </div>
    <div class="text-white font-semibold text-[24px] md:text-[32px] leading-[32px] md:leading-[48px]">
      {state === "login" ? "Log In" : "Sign Up"}
    </div>
    <div class="flex flex-col w-full gap-2">
      <input name="state" type="hidden" value={state} />
      <input
        name="username"
        type="text"
        placeholder="Enter your username"
        autocomplete="username"
        bind:value={username}
        required
        class="text-white text-[12px] md:text-[16px] w-full md:w-[400px] p-4 md:py-3 bg-slate-600 rounded-lg placeholder-slate-300 placeholder:text-base"
      />
      <input
        name="password"
        type="password"
        placeholder="Enter your password"
        autocomplete="current-password"
        bind:value={password}
        required
        class="text-white text-[12px] md:text-[16px] w-full md:w-[400px] p-4 md:py-3 bg-slate-600 rounded-lg placeholder-slate-300 placeholder:text-base"
      />
      {#if error}
        <p class="self-start flex sm:hidden text-blue-300 text-base">
          {error}
        </p>
      {:else}
        <div class="h-[24px] flex sm:hidden"></div>
      {/if}
    </div>
    <div class="w-full flex justify-end">
      <button
        type="submit"
        class="w-auto bg-blue-500 rounded-[4px] text-white px-4 py-2 text-base"
        >Done</button
      >
    </div>
  </form>
  {#if error}
    <p class="self-start hidden sm:flex text-blue-300 text-base">
      {error}
    </p>
  {:else}
    <div class="h-[24px] hidden sm:flex"></div>
  {/if}
</div>
