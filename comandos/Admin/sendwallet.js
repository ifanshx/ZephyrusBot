const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "sendwallet",
  description: "｢Admin｣ Send Your Wallet",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "address",
      description: "Enter a wallet address solana.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const allowedChannelId = process.env.SEND_WALLET_CHANNEL_ID;
    if (interaction.channelId !== allowedChannelId) {
      interaction.reply(
        `**${interaction.member.roles.name}** This command can only be used in the designated channel <#${process.env.SEND_WALLET_CHANNEL_ID}>.`
      );
      return;
    }
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageMessages
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.DEVELOPER_ROLE_ID
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.WITHELIS_ROLE_ID
      )
    ) {
      interaction.reply(`You do not have permission to use this command.`);
      return;
    }
    const AddressSolana = interaction.options.getString("address");
    const username = interaction.user.username;
    const userid = interaction.user.id;

    // check if username already exists in the database
    const response = await axios.get(
      `https://sheetdb.io/api/v1/01677ggfkifnq/search?Name=${username}`
    );
    if (response.data && response.data.length > 0) {
      const embed = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setTitle(`Hello ${username} `)
        .setDescription(`Your data already exists in our database`)
        .addFields(
          { name: "NAME", value: `${response.data[0].Name}` },
          { name: "USER ID", value: `${response.data[0].UserId}` },
          { name: "ADDRESS", value: `${response.data[0].Address}` }
        )
        .setTimestamp();

      interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: `Hello **${interaction.user.username}**, ✅ You have successfully submitted your wallet address ${AddressSolana}.`,
      ephemeral: true,
    });

    // submit the data to the database
    await axios.post("https://sheetdb.io/api/v1/01677ggfkifnq", {
      data: {
        Name: `${username}`,
        UserId: `${userid}`,
        Address: `${AddressSolana}`,
      },
    });
  },
};
