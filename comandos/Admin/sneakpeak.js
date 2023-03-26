const { TextInputStyle } = require(`discord.js`);
const { InteractionType } = require(`discord.js`);
const Discord = require(`discord.js`);

module.exports = {
  name: `sneakpeak`,
  description: `｢Admin｣ Create a beautiful message. (Beta)`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "chat",
      description: "Mention a channel.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageMessages
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.DEVELOPER_ROLE_ID
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.MODERATOR_ROLE_ID
      )
    )
      return interaction.reply({
        content: `**❌ | ${interaction.user},You need \`Manage Messages\` permission to use this command!**`,
        ephemeral: true,
      });

    const modal = new Discord.ModalBuilder()
      .setCustomId(`Embed`)
      .setTitle(`Create Embed🔪`);

    const TitleEmbed = new Discord.TextInputBuilder()
      .setCustomId(`TitleEmbed`)
      .setLabel(`Embed title`)
      .setPlaceholder(`Enter the title of the Embed.`)
      .setStyle(TextInputStyle.Short);

    const LinkImageUrl = new Discord.TextInputBuilder()
      .setCustomId(`LinkImageUrl`)
      .setLabel(`Embed LinkImageUrl`)
      .setPlaceholder(`Enter Embed LinkImageUrl`)
      .setStyle(TextInputStyle.Short);

    const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(
      TitleEmbed
    );
    const SegundaActionRow = new Discord.ActionRowBuilder().addComponents(
      LinkImageUrl
    );

    let chat = interaction.options.getChannel("chat");

    modal.addComponents(PrimeiraActionRow, SegundaActionRow);

    await interaction.showModal(modal);

    client.once(`interactionCreate`, async (interaction) => {
      if (!interaction.isModalSubmit()) return;

      if (interaction.customId === `Embed`) {
        const LinkImageUrl =
          interaction.fields.getTextInputValue(`LinkImageUrl`);
        const TitleEmbed = interaction.fields.getTextInputValue(`TitleEmbed`);

        let embedModal1 = new Discord.EmbedBuilder()
          .setColor("Random")
          .setTitle(`${TitleEmbed}`)
          .setImage(`${LinkImageUrl}`, { size: 200 })
          .setFooter({ text: `Command send by ${interaction.user.tag}` });

        interaction.reply({
          content: `**✅Modal Submitted successfully.**`,
          ephemeral: true,
        });

        chat
          .send({
            embeds: [embedModal1],
          })
          .catch((e) => {
            interaction.reply({
              content: `Something went wrong, please try again...`,
              ephemeral: true,
            });
          });
      }
    });
  },
};
