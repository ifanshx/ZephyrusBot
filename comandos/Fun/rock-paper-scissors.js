const { RockPaperScissors } = require("discord-gamecord");
const Discord = require("discord.js");

module.exports = {
  name: "rockpaperscissors",
  description: "｢Fun｣ Play rock, paper, scissors with someone (BETA)",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "opponent",
      type: Discord.ApplicationCommandOptionType.User,
      description: "Mention a user to play against.",
      required: true,
    },
  ],

  run: async (client, interaction, args) => {
    let user = interaction.options.getUser("opponent");

    if (user.id === interaction.user.id) {
      interaction.reply({
        content: "You can't play rock, paper, scissors with yourself!",
        ephemeral: true,
      });
      return;
    }
    if (user.id === client.user.id) {
      interaction.reply({
        content:
          "To play rock, paper, scissors with me use the command **/rps2**, I love a challenge!",
        ephemeral: true,
      });
      return;
    }

    new RockPaperScissors({
      message: interaction,
      slash_command: true,
      opponent: user,

      embed: {
        title: "[STONE | PAPER | SCISSORS]",
        description: "Click a button to play.",
        color: "Random",
      },

      buttons: {
        stone: "Stone",
        paper: "Paper",
        scissors: "Scissors",
      },

      emojis: {
        stone: "🗿",
        paper: "📃",
        scissors: "✂️",
      },

      othersMessage: "Você não possui permissão para utilizar este botão!",
      mentionUser: true,
      timeoutTime: 60000,
      chooseMessage: "Você escolheu {emoji}!",
      noChangeMessage: "Você não pode alterar sua escolha! ✋",
      askMessage:
        "Eii {opponent}, {challenger} desafiou você para jogar pedra, papel ou tesoura! 🤜🤛",
      cancelMessage: "Parece que o pedido foi recusado. 😔",
      timeEndMessage: "O jogo foi cancelado, pois não obtive uma resposta! 🤷‍♀️",
      drawMessage: "Foi um empate! 😱",
      winMessage: "{player} Venceu o jogo! 🏆",
      gameEndMessage: "O jogo não pode ser encerrado! 😢",
      timeoutMessage: "O tempo para esse jogo acabou! 😢",
      playerOnlyMessage:
        "Somente o {player} e {opponent} podem usar esse botão.",
    }).startGame();
  },
};
