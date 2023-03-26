const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "unmute",
  description: "｢Admin｣ Unmute.",
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "user",
      description: "The user you want to activate.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const mutedRole = interaction.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "mute"
    );

    if (!mutedRole) {
      return interaction.reply("Unable to find a job 'Mute'.");
    }

    if (member.roles.cache.has(mutedRole.id)) {
      member.roles.remove(mutedRole.id);
      interaction.reply(`User ${user} has been unvoiced.`);
    } else {
      interaction.reply(`The user ${user} is not muted.`);
    }
  },
};
