const { SlashCommandBuilder } = require('discord.js');
const { siteEmbed } = require('../embeds');
const { commands, mcserver } = require('../../config');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('site')
    .setDescription("Sends the Minecraft Server's website/vote link."),

  run: ({ interaction }) => {
    interaction.reply({ embeds: [siteEmbed] });
  },
  // Deletes the command from Discord
  deleted:
    !commands.slashCommands.site ||
    !commands.slashCommands.enabled ||
    !mcserver.site,
};
