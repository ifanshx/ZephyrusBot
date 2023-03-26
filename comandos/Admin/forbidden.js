const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "forbidden",
  description: "｢Admin｣ Server ban list.",
  type: Discord.ApplicationCommandType.ChatInput,

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
    )
      return interaction.reply({
        content: `**❌ - You do not have permission to use this command.**`,
        ephemeral: true,
      });

    let fetchBans = interaction.guild.bans.fetch();
    let banMembers = (await fetchBans)
      .map((member) => member.user.tag)
      .join("\n");

    if (!banMembers)
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**No banned members found...**`),
        ],
        ephemeral: true,
      });

    let embedBanidos = new Discord.EmbedBuilder()
      .setColor("Green")
      .setAuthor({
        name: `${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      })
      .setTimestamp()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setDescription(`${banMembers}`);

    interaction.reply({ embeds: [embedBanidos], ephemeral: true });
  },
};
