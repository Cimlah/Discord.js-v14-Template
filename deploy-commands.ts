import { REST, Routes } from "discord.js"
import * as importedCommands from "./commands"
const config = {
    discordToken: process.env.DISCORD_TOKEN,
    applicationId: process.env.APPLICATION_ID,
    guildId: process.env.GUILD_ID,
}

const commands = [];

for(const command in importedCommands) {
    const { data, execute, path } = importedCommands[command as keyof typeof importedCommands]

    if(data && typeof execute == "function") {
        commands.push(data.toJSON())
    }
    else {
        console.log(`[WARNING] The command at ${path} is missing a required "data" or "execute" property.`)
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.discordToken as string);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.applicationId as string, config.guildId as string),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();