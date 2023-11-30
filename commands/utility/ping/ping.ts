import { SlashCommandBuilder } from "discord.js"
import { slashCommandType } from "../../types/slashCommandType";

const path = import.meta.path
const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");
async function execute(interaction: { reply: (arg0: string) => any; }) {
    await interaction.reply("Pong!");
}

export const ping: slashCommandType = {
    path,
    data,
    execute,
}