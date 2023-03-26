const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "My command panel.😄",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    let embed_panel = new Discord.EmbedBuilder()
      .setColor("Aqua")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynmiac: true }),
      })
      .setDescription(
        `Hello ${interaction.user}, I'm here to helpr, see my commands below interacting with the panel:`
      );

    let embed_utility = new Discord.EmbedBuilder().setColor("Aqua").setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL({ dynmiac: true }),
    })
      .setDescription(`Here are some commands that might be useful for you, ${interaction.user}! 😊
            /help -- Show this message.
            /book -- Search for information about a book.
            /ping -- Discover my response time.
            /serverinfo -- View server information.
            /nft-info -- Provides information about me.
            /translate -- Translate a text into another language.
            /uptime -- How long have I been online.
            /userinfo -- View a user's information.`);

    let embed_fun = new Discord.EmbedBuilder().setColor("Aqua").setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL({ dynmiac: true }),
    })
      .setDescription(`Hi ${interaction.user}! Here are some super fun commands for you to use and have fun: 🎉🎮
             /animal -- Receive a random photo of a cute animal to brighten your day!
             /rockpaperscissors -- Play rock, paper, scissors with someone (BETA)
             /meme -- Creates an image of the stonks meme! (BETA)`);

    let embed_animegifs = new Discord.EmbedBuilder()
      .setColor("Aqua")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynmiac: true }),
      })
      .setDescription(`Here are some anime gifs you can use to brighten your day:
             /touch here -- Send a "touch here" to someone and show affection!`);

    let embed_adm = new Discord.EmbedBuilder().setColor("Aqua").setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.displayAvatarURL({ dynmiac: true }),
    })
      .setDescription(`Here are my little administration commands that can help you to take care of the server very carefully and efficiently:
             /admin-list -- Show admin list.
             /ban -- Ban a user.
             /bans -- Server banned list.
             /clear -- Clear the text channel.
             /embed -- Create a beautiful message. (Beta)
             /kick -- Kick a member.
             /lock -- Lock a channel.
             /mute -- Mute a user.
             /setnick -- Change a member's nickname.
             /slowmode-set -- Set slow mode.
             /slowmode off -- Disable slow mode.
             /sorteio -- Perform a draw.
             /unban -- Unban a user.
             /unmute -- Unmute.
             /unlock -- Unlock a channel.
             /verif-button -- Earn positions by clicking the button.`);

    let panel = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId("panel_help")
        .setPlaceholder("Click here!")
        .addOptions(
          {
            label: "Home Panel",
            //description: "",
            emoji: "📖",
            value: "Panel",
          },
          {
            label: "Utility",
            description: "See my utility commands.",
            emoji: "✨",
            value: "utility",
          },
          {
            label: "Fun",
            description: "See my fun commands.",
            emoji: "😅",
            value: "fun",
          },
          {
            label: "Animes Gifs",
            description: "See my anime gif commands.",
            emoji: "🌸",
            value: "animegifs",
          },
          {
            label: "Administration",
            description: "See my admin commands.",
            emoji: "🔨",
            value: "adm",
          }
        )
    );

    interaction
      .reply({ embeds: [embed_panel], components: [panel], ephemeral: true })
      .then(() => {
        interaction.channel
          .createMessageComponentCollector()
          .on("collect", (c) => {
            let valor = c.values[0];

            if (valor === "panel") {
              c.deferUpdate();
              interaction.editReply({ embeds: [embed_panel] });
            } else if (valor === "utility") {
              c.deferUpdate();
              interaction.editReply({ embeds: [embed_utility] });
            } else if (valor === "fun") {
              c.deferUpdate();
              interaction.editReply({ embeds: [embed_fun] });
            } else if (valor === "animegifs") {
              c.deferUpdate();
              interaction.editReply({ embeds: [embed_animegifs] });
            } else if (valor === "adm") {
              c.deferUpdate();
              interaction.editReply({ embeds: [embed_adm] });
            }
          });
      });
  },
};
