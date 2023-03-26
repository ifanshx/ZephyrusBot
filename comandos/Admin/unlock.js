const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "unlock",
  description: "｢Admin｣ Unlock channels.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "channel",
      description: "Mention the channel to unblock chat.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageChannels
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.DEVELOPER_ROLE_ID
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.MODERATOR_ROLE_ID
      )
    ) {
      interaction.reply({
        content: `You do not have permission to use this command.`,
        ephemeral: true,
      });
    } else {
      const channel = interaction.options.getChannel("channel");

      channel.permissionOverwrites
        .edit(interaction.guild.id, { SendMessages: true })
        .then(() => {
          interaction.reply({
            content: `🔓 The ${channel} text channel has been opened!`,
          });
          if (channel.id !== interaction.channel.id)
            return channel.send({
              content: `🔓This channel has been unlocked!`,
            });
        })
        .catch((e) => {
          interaction.reply({ content: `❌ Oops, an error occurred.` });
        });
    }
  },
};
