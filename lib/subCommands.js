const transferBool = bool => (bool ? '1' : '0')
const collect = (val, memo) => {
  const [title, actionURL] = val.split(';')
  memo.push({
    title,
    actionURL
  })
  return memo
}

module.exports = [
  {
    command: 'message <text>',
    description: 'send plain message'
  },
  {
    command: 'link <url>',
    description: 'send single link',
    options: [['--title [title]', 'title'], ['--content [content]', 'content text'], ['--pic [pic url]', 'link picUrl']]
  },
  {
    command: 'markdown <markdown string>',
    description: 'send plain message',
    options: [['--title [title]', 'title']]
  },
  {
    command: 'actionCard <content>',
    description: 'send actionCard',
    options: [
      ['--title [title]', 'title'],
      ['--hideAvatar', 'hideAvatar', transferBool],
      ['--btnOrientation', 'btnOrientation', transferBool],
      ['--singleTitle [singleTitle]', 'single button title'],
      ['--singleURL [singleURL]', 'single button url'],
      ['--btns [btns]', 'custom buttons, use format `text;URL`', collect, []]
    ]
  },
  {
    command: 'feedCard <message> [otherMessages...]',
    description: 'send feedCard'
  }
]
