const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const welcomeRole = await member.guild.roles.cache.find(
      (role) => role.id === process.env.MEMBER_ROLE_ID
    );
    await member.roles.add(welcomeRole);

    const welcomeChannel = await member.guild.channels.cache.find(
      (channel) => channel.id === process.env.WELCOME_CHANNEL_ID
    );

    const welcomeEmbed = new Discord.EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`Welcome to the server, ${member.user.username}!`)
      .setDescription(
        `We are so glad you joined us! Please introduce yourself in the <#${process.env.INTRO_CHANNEL_ID}> channel and read the server rules in <#${process.env.RULES_CHANNEL_ID}>.`
      )
      .setThumbnail(member.user.displayAvatarURL())

      .addFields(
        {
          name: "Server Name",
          value: `${member.guild.name}`,
          inline: true,
        },
        {
          name: "Total Members",
          value: `${member.guild.memberCount}`,
          inline: true,
        },
        {
          name: "Member Tag",
          value: `${member.user.tag}`,
          inline: true,
        }
      )
      .setTimestamp();

    await welcomeChannel.send({ embeds: [welcomeEmbed] });

    const dmEmbed = new Discord.EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`Welcome to ${member.guild.name}, ${member.user.username}!`)
      .setDescription(
        `We are so glad you joined us! Please introduce yourself in the <#${process.env.INTRO_CHANNEL_ID}> channel and read the server rules in <#${process.env.RULES_CHANNEL_ID}>.`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setImage(
        "https://cdn.discordapp.com/attachments/1234567890/1234567890/welcome-image.png"
      )
      .addFields(
        {
          name: "Server Name",
          value: `${member.guild.name}`,
          inline: true,
        },
        {
          name: "Total Members",
          value: `${member.guild.memberCount}`,
          inline: true,
        },
        {
          name: "Member Tag",
          value: `${member.user.tag}`,
          inline: true,
        }
      )
      .setTimestamp();

    await member.send({ embeds: [dmEmbed] });
  },
};
