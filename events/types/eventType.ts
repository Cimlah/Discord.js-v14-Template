import { Events } from "discord.js"

export type eventType = {
    name: Events
    once?: boolean,
    execute: (...args: any[]) => Promise<void>;
}