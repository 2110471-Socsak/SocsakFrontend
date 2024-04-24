import type { GetAllMessageResponse, Message } from "../models/message";
import.meta.env.VITE_BACK_URI;

export let data: GetAllMessageResponse;
export let isLoading = false;
export let error: string | null = null;


export const getAllMessages = async (isGroup: boolean, room: string, page: number, limit: number): Promise<GetAllMessageResponse> => {
    isLoading = true;
    try {
        const $session = JSON.parse(localStorage.getItem("user") || "{}");
        const response = await fetch(`${import.meta.env.VITE_BACK_URI}/${isGroup ? "groups" : "private"}/${room}/messages?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${$session.token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        data = jsonData;
        console.log("get this from fetch: ", data);
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        error = error;
    } finally {
        isLoading = false;
    }
    return data;
};
