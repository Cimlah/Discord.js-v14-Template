# Discord.js Template
Elevate your Discord bot development with the Discord.js Template, a meticulously crafted foundation using the power of Discord.js and the efficiency of the Bun runtime. This template serves as your compass, guiding you through the creation of robust Discord bots without the need to initiate the process from square one.

## Bun
This project was created using `bun init` in bun v1.0.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
### Scripts
* To install dependencies: `bun install`
* To run the bot: `bun run start`
* To run the bot and watch the changes: `bun run dev`
* To deploy list of commands to Discord: `bun run deploy-commands`

## Structure
In order to create new *slash commands* or *even listeners*, head over to *commands* or *events* directory.  
*Commands* directory consists of grouped commands. Use an existing group or create a new subdirectory which will symbolise a new group (not necessary, but is a neat way to organise your code).  
I use a nested [Barrel method](https://basarat.gitbook.io/typescript/main-1/barrel) for exporting. So remember to include an `index.ts` file with your exports in all subdirectories.
### Example
You want to define a slash command called *ping*.  
File structure:
```
commands/
├── index.ts
├── types
│   ├── index.ts
│   └── slashCommandType.ts
└── utility
    ├── index.ts
    └── ping
        ├── index.ts
        └── ping.ts
```

*commands/utility/ping/ping.ts*:
``` TypeScript
import { SlashCommandBuilder, CommandInteraction } from "discord.js"
import { slashCommandType } from "../../types/slashCommandType";

const path = import.meta.path
const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");
async function execute(interaction: CommandInteraction) {
    const username = interaction.user.username
    await interaction.reply(`Pong to ${username}!`);
}

export const ping: slashCommandType = {
    path,
    data,
    execute,
}
```

Remember to export everything (`path`, `data` and `execute`) inside an object. **This is very important, because `index.ts` inside root directory has to be able to go through all commands inside imported Module.**  
Then in the same directory, where `ping.ts` is located, create an *index.ts* to easily export everything in this directory. *commands/utility/ping/index.ts*: `export * from "./ping"`.  
Then, inside a group directory (in this case *utility*), create another *index.ts* to export everything in this directory. *commands/utility/index.ts*: `export * from "./ping"`  
And as last step, create *index.ts* inside *commands* directory in order to export every command. *commands/index.ts*: `export * from "./utility"`.  
**The goal of this approach is to have a nice short import of all commands inside `index.ts` at the root directory**. Like so: `import * as commands from "./commands"`.  
Everything explained so far, also applies to event listeners, which are located in *events* directory.