const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "uptime",
  description: "｢Utility｣ How long I'm online.",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let embed = new EmbedBuilder()
      .setColor("FF0000")
      .setTitle(`Start Time`)
      .setDescription(
        `Hello ${interaction.user}, I was started ago: \n\`${days}d ${hours}h ${minutes}m ${seconds}s\``
      )
      .setFooter({
        text: `Command requested by: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ format: "png" }),
      });

    interaction.reply({
      content: `${interaction.user}`,
      embeds: [embed],
      ephemeral: true,
    });
  },
};
