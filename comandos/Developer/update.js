const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "update",
  description: "｢Developer｣Set my status to update. - Only creator can use 😉",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (interaction.user.id !== process.env.DEVELOPER_ROLE_ID)
      return interaction.reply({
        content: `Only my owner can use this command!`,
        ephemeral: true,
      });
    else {
      client.user.setStatus("dnd");

      client.user.setPresence({
        activities: [
          {
            name: "Update. 😄",
          },
        ],
      });
      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(
          `Hello ${interaction.user}, my presence was set to "Update. 😄"!\nAnd my status was set to "dnd"!`
        )
        .setAuthor({
          name: `${client.user.username}`,
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        });
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
