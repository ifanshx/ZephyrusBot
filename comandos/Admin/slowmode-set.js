const Discord = require("discord.js");
const ms = require("ms");
require("dotenv").config();

module.exports = {
  name: "slowmode-set",
  description: "｢Admin｣ Configure slow mode.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "time",
      description: "Enter the slow mode time [s|m|h].",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "Mention a text channel.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageChannels
      )
    ) {
      interaction.reply({
        content: `You do not have permission to use this command.`,
        ephemeral: true,
      });
    } else {
      let t = interaction.options.getString("time");
      let tempo = ms(t);
      let channel = interaction.options.getChannel("channel");
      if (!channel || channel === null) channel = interaction.channel;

      if (!tempo || tempo === false || tempo === null) {
        interaction.reply({
          content: `Provide a valid time: [s|m|h].`,
          ephemeral: true,
        });
      } else {
        channel
          .setRateLimitPerUser(tempo / 1000)
          .then(() => {
            const embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setDescription(
                `The text channel ${channel} had its slow mode set to \`${t}\`.`
              );
            interaction.reply({ embeds: [embed] });
            return;
          })
          .catch(() => {
            interaction.reply({
              content: `Oops, something went wrong when running this command, check my permissions, I need to have the "Manage Channels" permission.`,
              ephemeral: true,
            });
          });
      }
    }
  },
};
