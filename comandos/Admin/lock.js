const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "lock",
  description: "｢Admin｣ Lock a channel.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "channel",
      description: "Mention a channel to block the chat.",
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
      const canal = interaction.options.getChannel("channel");

      canal.permissionOverwrites
        .edit(interaction.guild.id, { SendMessages: false })
        .then(() => {
          interaction.reply({
            content: `🔒 The text channel ${channel} has been blocked!`,
          });
          if (canal.id !== interaction.channel.id)
            return canal.send({ content: `🔒 This channel has been blocked!` });
        })
        .catch((e) => {
          interaction.reply({ content: `❌ Oops, something went wrong.` });
        });
    }
  },
};
