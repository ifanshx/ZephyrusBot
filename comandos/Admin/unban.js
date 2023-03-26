const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "unban",
  description: "｢Admin｣ Unban a user.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "Mention a user to be unbanned.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Enter a reason.",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.BanMembers
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.DEVELOPER_ROLE_ID
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.MODERATOR_ROLE_ID
      )
    ) {
      interaction.reply(`You do not have permission to use this command.`);
    } else {
      let user = interaction.options.getUser("user");
      let motivo = interaction.options.getString("reason");
      if (!motivo) motivo = "Undefined.";

      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `User ${user} (\`${user.id}\`) has been successfully unbanned!`
        );

      let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `Could not unban user ${user} (\`${user.id}\`) from server!`
        );

      interaction.guild.members
        .unban(user.id, motivo)
        .then(() => {
          interaction.reply({ embeds: [embed] });
        })
        .catch((e) => {
          interaction.reply({ embeds: [erro] });
        });
    }
  },
};
