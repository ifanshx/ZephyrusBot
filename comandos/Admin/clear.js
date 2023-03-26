const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "clear",
  description: "｢Admin｣ Clear the text channel.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "amount",
      description: "Number of messages to be deleted.",
      type: Discord.ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    let numero = interaction.options.getNumber("amount");

    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageMessages
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
    } else if (parseInt(numero) > 200 || parseInt(numero) <= 0) {
      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`\`/clear [1 - 200]\``);
      interaction.reply({ embeds: [embed] });
    } else {
      const now = new Date().getTime();
      const messages = await interaction.channel.messages.fetch({
        limit: numero,
      });
      const deletableMessages = messages.filter(
        (msg) => now - msg.createdTimestamp <= 14 * 24 * 60 * 60 * 1000
      );
      const nonDeletableMessages = messages.filter(
        (msg) => now - msg.createdTimestamp > 14 * 24 * 60 * 60 * 1000
      );
      if (nonDeletableMessages.size > 0) {
        let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(
            "You can only delete messages that are less than 14 days old."
          );
        interaction.reply({ embeds: [embed] });
      }
      if (deletableMessages.size > 0) {
        try {
          await interaction.channel.bulkDelete(deletableMessages, {
            filterOld: true,
          });
          let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setAuthor({
              name: interaction.guild.name,
              iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `The text channel ${interaction.channel} had \`${deletableMessages.size}\` messages deleted by \`${interaction.user.username}\`.`
            );
          interaction.reply({ embeds: [embed] });
          setTimeout(() => {
            interaction.deleteReply();
          }, 5000);
        } catch (error) {
          console.error(error);
          interaction.reply({
            content: "😭 An error occurred while trying to delete messages.",
            ephemeral: true,
          });
        }
      } else {
        interaction.reply({
          content: "There are no messages to delete.",
          ephemeral: true,
        });
      }
    }
  },
};
