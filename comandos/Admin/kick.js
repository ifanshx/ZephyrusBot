const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "kick",
  description: "｢Admin｣ Kick members.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "member",
      description: "Mention members",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Explain the reason for the expulsion.",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.KickMembers
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
        epemeral: true,
      });
    } else {
      const user = interaction.options.getUser("member");
      const member = interaction.guild.members.cache.get(user.id);

      if (!member) {
        return interaction.reply({
          content: `Member not found.`,
          ephemeral: true,
        });
      }

      let reason = interaction.options.getString("reason");
      if (!reason) reason = "Uninformed";

      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `User ${member}has been successfully kicked!\n\n> reason: \`${reason}\`\n\n> By ${interaction.user.tag}.`
        );

      let embed_erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `User ${member} has not been kicked from the server!\There was an error executing this command, please try again.`
        );

      member
        .kick(reason)
        .then(() => {
          interaction.reply({ embeds: [embed] });
        })
        .catch((e) => {
          interaction.reply({ embeds: [embed_erro], epemeral: true });
        });
    }
  },
};
