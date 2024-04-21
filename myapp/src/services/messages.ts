import { writable } from "svelte/store";
import type { Message } from "../models/message";
import.meta.env.VITE_BACK_URI

export const messagesStore = writable<Message[]>([]);
