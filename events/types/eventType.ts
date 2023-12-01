import { Events } from "discord.js"

export type eventType = {
    name: Events
    once?: boolean,
    execute: (...client: any[]) => Promise<void>;
}