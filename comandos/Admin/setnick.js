const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "setnick",
  description: "｢Admin｣ Change member nickname.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "member",
      description: "Mention member to change nick.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "nick",
      description: "Type in the member's new nickname.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageNicknames
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
      const user = interaction.options.getUser("member");
      const membro = interaction.guild.members.cache.get(user.id);
      const nick = interaction.options.getString("nick");

      membro
        .setNickname(`${nick}`)
        .then(() => {
          let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `Username ${user} successfully changed to \`${nick}\`.`
            );
          interaction.reply({ embeds: [embed] });
        })
        .catch((e) => {
          let embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`The entered Nick has more than 32 characters.`);
          interaction.reply({ embeds: [embed] });
        });
    }
  },
};
