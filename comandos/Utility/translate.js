const Discord = require("discord.js");
const { translate } = require("@vitalets/google-translate-api");

module.exports = {
  name: "translate",
  description: "｢Utility｣ Translate a text into another language.",
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
      name: "text",
      description: "Enter the text you want to translate.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "language",
      description: "Select the language you want to translate the text into.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "German", value: "de" },
        { name: "Chinese (simplified)", value: "zh-CN" },
        { name: "Chinese (traditional)", value: "zh-TW" },
        { name: "Spanish", value: "es" },
        { name: "French", value: "fr" },
        { name: "English", value: "en" },
        { name: "Italian", value: "it" },
        { name: "Japanese", value: "ja" },
        { name: "Portuguese", value: "pt" },
        { name: "Portuguese (Brazil)", value: "pt-br" },
        { name: "Russian", value: "ru" },
        { name: "Indonesian", value: "id" },
      ],
    },
  ],

  run: async (client, interaction) => {
    const text = interaction.options.getString("text");
    const lang = interaction.options.getString("language");

    try {
      const result = await translate(text, { to: lang });
      const embed = new Discord.EmbedBuilder()
        .setTitle(`Translation of "${text}"`)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setFooter({ text: `Command send by ${interaction.user.tag}` })
        .setDescription(result.text);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Unable to translate text.",
        ephemeral: true,
      });
    }
  },
};
