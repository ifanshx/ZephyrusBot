const Discord = require("discord.js");

module.exports = {
  name: "verify",
  description: "｢Admin｣ Ganhe cargos clicando nos botões.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "chat",
      description: "Mention a channel.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "role",
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
    ) {
      interaction.reply({
        content: `**❌ | ${interaction.user},You need \`Manage Messages\` permission to use this command!**`,
        ephemeral: true,
      });
    } else {
      let cargo = interaction.options.getRole("role");

      let chat = interaction.options.getChannel("chat");

      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle(`Verify Zephyrus`)
        .setURL("https://zephyrus.com/")
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setImage(`${client.user.displayAvatarURL()}`)
        .setDescription(
          `Click the button below to get the **${cargo.name}** role.`
        );

      let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("cargo_b" + interaction.id)
          .setLabel("Clique Aqui!")
          .setStyle(Discord.ButtonStyle.Secondary)
      );

      chat.send({ embeds: [embed], components: [botao] }).then(() => {
        let coletor = interaction.channel.createMessageComponentCollector();

        coletor.on("collect", (c) => {
          if (!c.member.roles.cache.get(cargo.id)) {
            c.member.roles.add(cargo.id);
            c.reply({
              content: `Olá **${c.user.username}**, você resgatou o cargo **${cargo.name}**.`,
              ephemeral: true,
            });
          } else if (c.member.roles.cache.get(cargo.id)) {
            c.member.roles.remove(cargo.id);
            c.reply({
              content: `Olá **${c.user.username}**, você perdeu o cargo **${cargo.name}**.`,
              ephemeral: true,
            });
          }
        });
      });
    }
  },
};
