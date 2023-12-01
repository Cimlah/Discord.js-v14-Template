import { Events } from "discord.js"
import { eventType } from "../types"

const name = Events.ClientReady
const once = true
async function execute(client: { user: { tag: any } }) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
}

export const readyEvent: eventType  = {
    name,
    once,
    execute,
}