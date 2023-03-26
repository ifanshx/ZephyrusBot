const Discord = require("discord.js");
const ms = require("ms");
require("dotenv").config();

module.exports = {
  name: "giveaway",
  description: "｢Admin｣ Conduct a raffle.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "reward",
      type: Discord.ApplicationCommandOptionType.String,
      description: "What will the prize be?",
      required: true,
    },
    {
      name: "description",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Descreva o que será sorteado.",
      required: true,
    },
    {
      name: "time",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Select draw time.",
      required: true,
      choices: [
        {
          name: "30 Seconds",
          value: "30s",
        },
        {
          name: "1 Minute",
          value: "1m",
        },
        {
          name: "5 Minutes",
          value: "5m",
        },
        {
          name: "10 Minutes",
          value: "10m",
        },
        {
          name: "15 Minutes",
          value: "15m",
        },
        {
          name: "30 Minutes",
          value: "30m",
        },
        {
          name: "45 Minutes",
          value: "45m",
        },
        {
          name: "1 Hour",
          value: "1h",
        },
        {
          name: "2 Hours",
          value: "2h",
        },
        {
          name: "5 Hours",
          value: "5h",
        },
        {
          name: "12 Hours",
          value: "12h",
        },
        {
          name: "1 Day",
          value: "24h",
        },
        {
          name: "3 Days",
          value: "72h",
        },
        {
          name: "1 Week",
          value: "168h",
        },
      ],
    },
  ],

  run: async (client, interaction, args) => {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.ManageGuild
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.DEVELOPER_ROLE_ID
      ) &&
      !interaction.member.roles.cache.some(
        (role) => role.id === process.env.MODERATOR_ROLE_ID
      )
    ) {
      interaction.reply({
        content: `You do not have permission to use this command.`,
        ephemeral: true,
      });
    } else {
      let reward = interaction.options.getString("reward");
      let tempo = interaction.options.getString("time");
      let desc = interaction.options.getString("description");

      let duration = ms(tempo);

      let button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("button")
          .setEmoji("🎉")
          .setStyle(Discord.ButtonStyle.Secondary)
      );

      let click = [];

      let embed = new Discord.EmbedBuilder()
        .setAuthor({
          name: `New giveaway!`,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(
          `> Sponsor: ${interaction.user}.
> Reward: **${reward}.**

> ${desc}

> Time: \`${tempo}\`.
Click the button to participate.\n**Good luck!!!**`
        )
        .setTimestamp(Date.now() + ms(tempo))
        .setFooter({ text: "Draw date:" })
        .setColor("Random");

      let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`Unable to promote a giveaway!`);

      const msg = await interaction
        .reply({ embeds: [embed], components: [button] })
        .catch((e) => {
          interaction.reply({ embeds: [erro] });
        });

      const coletor = msg.createMessageComponentCollector({
        time: ms(tempo),
      });

      coletor.on("end", (i) => {
        interaction.editReply({
          components: [
            new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setDisabled(true)
                .setCustomId("button")
                .setEmoji("🎉")
                .setStyle(Discord.ButtonStyle.Secondary)
            ),
          ],
        });
      });

      coletor.on("collect", (i) => {
        if (i.customId === "button") {
          if (click.includes(i.user.id))
            return i.reply({
              content: `Hello ${interaction.user.username}, you are already participating in the draw.`,
              ephemeral: true,
            });

          click.push(i.user.id);

          interaction.editReply({ embeds: [embed] });

          i.reply({
            content: `Hello ${interaction.user.username}, you entered the draw.`,
            ephemeral: true,
          });
        }
      });

      setTimeout(() => {
        let winner = click[Math.floor(Math.random() * click.length)];

        if (click.length == 0)
          return interaction.followUp(
            `\n**GIVEAWAY CANCELED!**\n There were no participants in the draw \`${reward}\`.`
          );

        interaction.followUp(
          `**Congratulations <@${winner}> you won the raffle: \`${reward}\`.**`
        );
      }, duration);
    }
  },
};
