import { SlashCommandBuilder, CommandInteraction } from "discord.js"
import { slashCommandType } from "../../types/slashCommandType";

const path = import.meta.path
const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");
async function execute(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
}

export const ping: slashCommandType = {
    path,
    data,
    execute,
}