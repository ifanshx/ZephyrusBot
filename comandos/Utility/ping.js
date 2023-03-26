const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "｢Utility｣ Find out my response time.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `> Hello ${interaction.user}\n\n> My ping is \`${ping}ms\`.`
      )
      .setColor("Random");

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
