<script lang="ts">
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
        clearInput();
    }

    function handleClickSignup() {
        state = "signup";
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
                const response = await fetch(
                    `${import.meta.env.VITE_BACK_URI}/auth/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({ username, password }),
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                );

                const res = await response.json();
                if (res.success) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    goto("/");
                } else error = res.message;
                break;
            }
            case "signup": {
                const response = await fetch(
                    `${import.meta.env.VITE_BACK_URI}/auth/register`,
                    {
                        method: "POST",
                        body: JSON.stringify({ username, password }),
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                );

                const res = await response.json();
                if (res.success) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    goto("/");
                } else error = res.message;
                break;
            }
        }
    }
</script>

<div class="w-screen h-screen flex self-center items-center justify-center">
    <form
        on:submit={handleOnSubmit}
        class="w-11/12 md:w-fit h-fit flex justify-center p-6 md:px-12 md:py-8 bg-slate-800 flex-col gap-8 rounded-lg items-center"
    >
        <div class="w-full flex justify-center text-base">
            <button
                on:click={handleClickLogin}
                type="button"
                class={state === "login" ? selectedStyle : defaultStyle}
            >
                Log In
            </button>
            <button
                on:click={handleClickSignup}
                type="button"
                class={state === "signup" ? selectedStyle : defaultStyle}
            >
                Sign Up
            </button>
        </div>
        <div
            class="text-white font-semibold text-[24px] md:text-[32px] leading-[32px] md:leading-[48px]"
        >
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
                <p class="self-start text-blue-300 text-base">
                    {error}
                </p>
            {:else}
                <div class="h-[24px]"></div>
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
</div>
