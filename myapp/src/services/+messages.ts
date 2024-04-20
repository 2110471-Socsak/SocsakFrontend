import { writable } from "svelte/store";
import type { Message } from "../models/message";

export const messagesStore = writable<Message[]>([]);

export function getUser() {
  return fetch("http://localhost:8080/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get user");
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}