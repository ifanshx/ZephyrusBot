const Discord = require("discord.js");
const ms = require("ms");
require("dotenv").config();

module.exports = {
  name: "slowmode",
  description: "｢Admin｣ Disable slow mode.",
  options: [
    {
      name: "off",
      description: "｢Admin｣ Disable slow mode.",
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel",
          description: "Mention a text channel.",
          type: Discord.ApplicationCommandOptionType.Channel,
          required: false,
        },
      ],
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
      let t = -1;
      let tempo = ms(t);
      let channel = interaction.options.getChannel("channel");

      if (!channel || channel === null) channel = interaction.channel;
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
              `The text channel ${channel} had its slow mode set to \`Disabled\`.`
            );
          interaction.reply({ embeds: [embed] });
        })
        .catch(() => {
          interaction.reply({
            content: `Oops, something went wrong when running this command, check my permissions, I need to have the "Manage Channels" permission.`,
            ephemeral: true,
          });
        });
    }
  },
};
