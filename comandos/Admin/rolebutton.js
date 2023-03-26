const { TextInputStyle } = require(`discord.js`);
const wait = require("node:timers/promises").setTimeout;
const Discord = require(`discord.js`);

module.exports = {
  name: `rolebutton`,
  description: `｢Admin｣ Create a beautiful message send wallet (Beta)`,
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "chat",
      description: "Mention a channel.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "verify",
      description: "Specify the role to be added to the button.",
      type: Discord.ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageRoles
      )
    )
      return interaction.reply({
        content: `**❌ | ${interaction.user},You need \`Manage Messages\` permission to use this command!**`,
        ephemeral: true,
      });
    let verify = interaction.options.getRole("verify");
    const modal = new Discord.ModalBuilder()
      .setCustomId(`Embed`)
      .setTitle(`Create Embed🔪`);

    const TitleEmbed = new Discord.TextInputBuilder()
      .setCustomId(`TitleEmbed`)
      .setLabel(`Embed title`)
      .setPlaceholder(`Enter the title of the Embed.`)
      .setStyle(TextInputStyle.Short);

    const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(
      TitleEmbed
    );

    let chat = interaction.options.getChannel("chat");

    modal.addComponents(PrimeiraActionRow);

    await interaction.showModal(modal);

    client.once(`interactionCreate`, async (interaction) => {
      if (!interaction.isModalSubmit()) return;

      if (interaction.customId === `Embed`) {
        const TitleEmbed = interaction.fields.getTextInputValue(`TitleEmbed`);

        let embedModal1 = new Discord.EmbedBuilder()
          .setColor("Random")
          .setTitle(`${TitleEmbed}`)
          .setURL("https://zephyrus.com/")
          .setThumbnail(`${client.user.displayAvatarURL()}`)
          .setImage(`${client.user.displayAvatarURL()}`)
          .setDescription(
            `Click the button below to get the **${verify.name}** role.`
          );

        let button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("cargo_b" + interaction.id)
            .setLabel("Click Here!!")
            .setStyle(Discord.ButtonStyle.Secondary)
        );

        interaction.reply({
          content: `**✅Modal Submitted successfully.**`,
          ephemeral: true,
        });
        chat
          .send({
            embeds: [embedModal1],
            components: [button],
          })
          .then(async () => {
            let coletor = interaction.channel.createMessageComponentCollector();

            coletor.on("collect", (c) => {
              if (!c.member.roles.cache.get(verify.id)) {
                c.member.roles.add(verify.id);
                c.reply({
                  content: `Hello **${c.user.username}**, you have been granted the **${verify.name}** role.`,
                  ephemeral: true,
                });
              } else if (c.member.roles.cache.get(verify.id)) {
                c.member.roles.remove(verify.id);
                c.reply({
                  content: `Hello **${c.user.username}**, you have lost your **${verify.name}** role.`,
                  ephemeral: true,
                });
              }
            });
          });
      }
    });
  },
};
