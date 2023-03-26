const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "ban",
  description: "｢Admin｣ Ban a user.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "Specify the user to be banned.",
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
      let userr = interaction.options.getUser("user");
      let user = interaction.guild.members.cache.get(userr.id);
      let reason = interaction.options.getString("reason");
      if (!reason) reason = "Not specified.";

      let embed = new Discord.MessageEmbed()
        .setColor("Green")
        .setDescription(
          `User ${user} (\`${user.id}\`) has been successfully banned by ${interaction.user.tag}.`
        );

      let error = new Discord.MessageEmbed()
        .setColor("Red")
        .setDescription(
          `Could not ban user ${user} (\`${user.id}\`) from the server!`
        );

      user
        .ban({ reason: reason })
        .then(() => {
          interaction.reply({ embeds: [embed] });
        })
        .catch((e) => {
          interaction.reply({ embeds: [error] });
        });
    }
  },
};
