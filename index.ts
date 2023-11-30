import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import * as commands from "./commands"
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
}

discordClient.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})
discordClient.login(discordToken)

discordClient.on(Events.InteractionCreate, async (interaction) => {
    if(!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch(error) {
        console.log(error)
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true })
        }
        else {
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
        }
    }
})