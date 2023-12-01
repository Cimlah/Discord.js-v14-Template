import { SlashCommandBuilder } from "discord.js"

export type slashCommandType = {
    path: string,
    data: SlashCommandBuilder,
    execute: (interaction: any) => Promise<void>,
}