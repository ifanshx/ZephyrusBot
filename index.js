const Discord = require("discord.js");
("use strict");
const dotenv = require("dotenv");
dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildPresences,
  ],
});

module.exports = client;

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  let mentions = [`<@${client.user.id}>`, `<@!${client.user.id}>`];

  mentions.forEach((element) => {
    if (message.content === element) {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `😘 Hello, ${message.author} use \`/help\` to see a list of our commands.\n To know our history use \`/nft-info\`.`
        );

      message.reply({ embeds: [embed] });
    }
  });
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      return interaction.reply({
        content: "😭 An error occurred while executing the command!",
        ephemeral: true,
      });
    }
    try {
      interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
      );
      await cmd.run(client, interaction);
    } catch (error) {
      console.error(`Error executing command "${cmd.name}": ${error}`);
      interaction.reply({
        content:
          "😭 An error occurred while executing the command. Inform the developer.",
        ephemeral: true,
      });
    }
  }
});

client.on("ready", () => {
  console.log(
    `🔥 I'm online at ${client.guilds.cache.size} Servers!\n🎈 I am logged in as ${client.user.tag}!`
  );
  client.user.setStatus("online");
  client.user.setPresence({
    activities: [
      {
        name: "Type /help for the list of commands.",
      },
    ],
  });
});

process.on("multipleResolutions", (type, reason, promise) => {
  console.log(`🚫 Error Detected: \n\n` + type, promise, reason);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(`🚫 Error Detected:\n\n` + reason, promise);
});

process.on("uncaughtException", (error, origin) => {
  console.log(`🚫 Error Detected:\n\n` + error, origin);
});

process.on("uncaughtExceptionMonitor", (error, origin) => {
  console.log(`🚫 Error Detected:\n\n` + error, origin);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  const tempoAtual = Date.now();
  const tempoAnterior = message.createdTimestamp;
  const intervaloTempo = (tempoAtual - tempoAnterior) / 1000;
  if (intervaloTempo > 30) return;
});

client.slashCommands = new Discord.Collection();

require("./handler")(client);

client.login(process.env.DISCORD_TOKEN);
