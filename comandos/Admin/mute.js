const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "mute",
  description: "｢Admin｣ Mute a user.",
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "user",
      description: "User to be muted.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "time",
      description: "Time in seconds for the user to be muted.",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const member = interaction.options.getMember("user");
    const seconds = interaction.options.getInteger("time");
    const reason = `Muted by ${interaction.user.tag}`;

    if (!member) {
      return interaction.reply({
        content: "User not found.",
        ephemeral: true,
      });
    }

    if (!member.manageable) {
      return interaction.reply({
        content: "I don't have permission to mute this user.",
        ephemeral: true,
      });
    }

    const mutedRole = interaction.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "mutated"
    );

    if (!mutedRole) {
      return interaction.reply({
        content:
          "I didn't find the position `Muted`. Please create a role with that name and try again.",
        ephemeral: true,
      });
    }

    if (member.roles.cache.has(mutedRole.id)) {
      return interaction.reply({
        content: "User is already muted.",
        ephemeral: true,
      });
    }

    await member.roles.add(mutedRole, reason);
    interaction.reply({
      content: `${member} has been muted for ${seconds} seconds.`,
    });

    setTimeout(() => {
      member.roles.remove(mutedRole, "Silence time expired.");
    }, seconds * 1000);
  },
};
