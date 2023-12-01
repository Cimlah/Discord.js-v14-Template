import { Events } from "discord.js"
import { eventType } from "../types";

const name = Events.InteractionCreate
async function execute(interaction: { isChatInputCommand: () => any; client: { commands: { get: (arg0: any) => any; }; }; commandName: any; replied: any; deferred: any; followUp: (arg0: { content: string; ephemeral: boolean; }) => any; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
}

export const interactionCreateEvent: eventType = {
    name,
    execute,
}