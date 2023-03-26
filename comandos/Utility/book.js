const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "book",
  description: "｢Utility｣ Search for information about a book.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "titles",
      description: "the title of the book",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const title = interaction.options.getString("titles");

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          title
        )}`
      );

      const books = response.data.items;

      if (!books || books.length === 0) {
        return interaction.reply({
          content: `Tidak dapat menemukan informasi tentang buku "${title}"`,
          ephemeral: true,
        });
      }

      const book = books[0].volumeInfo;
      const embed = new Discord.EmbedBuilder()
        .setColor("#FFB6C1")
        .setTitle(book.title)
        .setURL(book.previewLink)
        .setFooter({ text: "Sumber: books.google.com" })
        .setDescription(
          `**Author(s)**: ${book.authors || "Unknown"}\n**Publisher**: ${
            book.publisher || "Tidak dikenal"
          }\n**Tanggal publikasi**: ${
            book.publishedDate || "Tidak dikenal"
          }\n**Jumlah halaman**: ${
            book.pageCount ? book.pageCount.toLocaleString() : "Tidak dikenal"
          }\n**Klasifikasi**: ${book.averageRating || "Tidak dikenal"}\n
        **Deskripsi buku:** ${book.description || "Sem descrição"}`
        )
        .setThumbnail(book.imageLinks?.thumbnail);

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setLabel("informasi lengkap")
          .setURL(`${book.previewLink}`)
          .setStyle(Discord.ButtonStyle.Link)
      );

      interaction.reply({
        embeds: [embed],
        components: [button],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "Terjadi kesalahan saat mengambil informasi tentang buku",
        ephemeral: true,
      });
    }
  },
};
