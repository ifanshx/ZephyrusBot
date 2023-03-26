const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "setstatus",
  description: "｢Developer｣ Configure my status. - Only creator can use😉.",
  options: [
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "status",
      description:
        "Which style do you want to apply (online, dnd, idle, invisible)?",
      required: true,
    },
    {
      type: Discord.ApplicationCommandOptionType.String,
      name: "description",
      description: "What will the status description be?",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (interaction.user.id !== process.env.DEVELOPER_ROLE_ID)
      return interaction.reply({
        content: `Only my owner can use this command!`,
        ephemeral: true,
      });

    try {
      let status = interaction.options.getString("status");
      let desc = interaction.options.getString("description");

      client.user.setStatus(`${status}`);

      client.user.setPresence({
        activities: [
          {
            name: desc,
          },
        ],
      });

      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle("Status Updated!")
        .addFields(
          {
            name: `🔮 I changed my status to: `,
            value: `\`${status}\`.`,
            inline: false,
          },
          {
            name: `📝 I changed my description to:`,
            value: `\`${desc}\`.`,
            inline: false,
          }
        );

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      return console.log(
        `Opps ${interaction.user}, something went wrong when running this command.`
      );
    }
  },
};
