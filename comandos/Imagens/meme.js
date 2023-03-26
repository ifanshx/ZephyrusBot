const Discord = require("discord.js");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  name: "meme",
  description: "｢Fun｣ Create a stonks meme image! (BETA)",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "text",
      description: "Write text for the image.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const text = interaction.options.getString("text");
    await interaction.deferReply();

    const canvas = createCanvas(415, 415);
    const ctx = canvas.getContext("2d");

    await new Promise((resolve) => setTimeout(resolve, 100));

    const stonks = await loadImage("./imagens/nft.png");

    ctx.drawImage(stonks, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 25px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    ctx.fillText(text, 0, 0);

    const attachment = new Discord.AttachmentBuilder(
      canvas.toBuffer(),
      "nft.png"
    );

    await interaction.editReply({
      content: `${interaction.user}\n`,
      files: [attachment],
    });
  },
};
