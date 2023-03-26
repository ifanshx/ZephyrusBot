const Discord = require("discord.js");

module.exports = {
  name: "nftinfo",
  description: "Provides information about me.",
  options: [
    {
      name: "info",
      description: "Provides information about me.",
      type: Discord.ApplicationCommandOptionType.Subcommand,
    },
  ],

  run: async (client, interaction) => {
    let dono = "829192987124826142"; // ID
    let members = client.users.cache.size;
    let servers = client.guilds.cache.size;
    let bot = client.user.username;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let message = `Eu fui criada por Geovane.js#9037.`;

    let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: bot, iconURL: avatar_bot })
      .setFooter({ text: message })
      .setTimestamp(new Date())
      .setThumbnail(avatar_bot)
      .setDescription(`Hello, I'm \`${bot}\` (or, as my close friends call me, "Star"), I'm 14 years old and my goal is to improve Discord servers, providing entertainment, ease and much more. I'm currently present on \`${servers}\` servers, with \`${members}\` members. Since January 5, 2023, I've been working on making the servers even better. 😘

             Let's go together, ${interaction.user}\, to make the world of Discord servers even better! Thanks for adding me to your servers. Without you, I wouldn't be online.`);

    interaction.reply({ embeds: [embed] });
  },
};
