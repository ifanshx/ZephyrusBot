const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "｢Utility｣ View server information.",
  type: Discord.ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    let members = interaction.guild.memberCount;
    let positions = interaction.guild.roles.cache.size;
    let channels = interaction.guild.channels.cache.size;
    let camein = interaction.guild.joinedTimestamp;
    let servidor = interaction.guild;
    let ownerid = interaction.guild.ownerId;
    let emojis = interaction.guild.emojis.cache.size;
    let serverid = interaction.guild.id;
    let impulses = interaction.guild.premiumSubscriptionCount;
    let data = interaction.guild.createdAt.toLocaleDateString("pt-br");

    let embed = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setThumbnail(
        interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 })
      )
      .setTitle(`Server info: ${interaction.guild}`)
      .addFields(
        {
          name: `Identity`,
          value: `\`\`\`${serverid}\`\`\``,
          inline: true,
        },
        {
          name: `Channels in general:`,
          value: `channels: ${channels}\n positions: ${positions}`,
          inline: true,
        },
        {
          name: `Users`,
          value: `\`\`\`${members} members\`\`\``,
          inline: true,
        },
        {
          name: `Server created`,
          value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
          inline: true,
        },
        {
          name: `🚀 ${interaction.user.username} entered into`,
          value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
          inline: true,
        },
        {
          name: `Owner`,
          value: `<@!${ownerid}> \n\`\`${ownerid}\`\``,
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  },
};
