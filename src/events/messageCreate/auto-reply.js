const { autoReply, mcserver, commands } = require('../../../config');
module.exports = async (msg) => {
  try {
    if (
      !autoReply.enabled ||
      msg.author.bot ||
      msg.content.startsWith(commands.prefixCommands.prefix)
    )
      return;
    const { content } = msg;
    const { ip, site, status, version } = autoReply;
    const isIp = new RegExp(`\\b(${ip.triggerWords.join('|')})\\b`);
    const isSite = new RegExp(`\\b(${site.triggerWords.join('|')})\\b`);
    const isStatus = new RegExp(`\\b(${status.triggerWords.join('|')})\\b`);
    const isVersion = new RegExp(`\\b(${version.triggerWords.join('|')})\\b`);

    if (isIp.test(content))
      msg.channel.send(
        ip.replyText
          .replace(/{ip}/g, mcserver.ip)
          .replace(/{port}/g, mcserver.port)
      );
    if (isSite.test(content))
      msg.channel.send(site.replyText.replace(/{site}/g, mcserver.site));
    if (isVersion.test(content))
      msg.channel.send(
        version.replyText.replace(/{version}/g, mcserver.version)
      );
    if (isStatus.test(content)) {
      await msg.channel.sendTyping();
      const { getServerDataOnly } = require('../../index');
      const { data, isOnline } = await getServerDataOnly();
      msg.channel.send(
        isOnline
          ? status.onlineReply
              .replace(/{playerOnline}/g, data.players.online)
              .replace(/{playerMax}/g, data.players.max)
          : status.offlineReply
      );
    }
  } catch (error) {
    const { getError } = require('../../index');
    console.log(getError(error, 'Auto Reply'));
  }
};
