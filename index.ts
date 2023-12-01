import { Client, Collection, GatewayIntentBits } from "discord.js"
import * as commands from "./commands"
import * as events from "./events"
const discordToken = process.env.DISCORD_TOKEN

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] })
discordClient.commands = new Collection()

for(const command in commands) {
    const { data, execute, path } = commands[command as keyof typeof commands]

    if(data && execute) {
        discordClient.commands.set(data.name, commands[command as keyof typeof commands])
    }
    else {
        console.log(`[WARNING] The command at ${path} is missing a required "data" or "execute" property.`)
    }
} // Load all commands

for(const event in events) {
    const { name, once, execute } = events[event as keyof typeof events]
    
    if(once) {
        discordClient.once(name as string, (...args) => execute(...args))
    }
    else {
        discordClient.on(name as string, (...args) => execute(...args))
    }
} // Load all event listeners

discordClient.login(discordToken)