const { EventEmitter } = require('events')
const fetch = require('node-fetch')

const parseFeed = string => {
  const [title, messageURL, picURL] = string.split(';')
  return {
    title,
    messageURL,
    picURL
  }
}

class Robot extends EventEmitter {
  constructor(options) {
    super(options)
    this.options = {
      defaultTitle: '新消息',
      defaultBtnText: '阅读更多',
      ...options
    }
  }

  async _send(payload) {
    return fetch(`https://oapi.dingtalk.com/robot/send?access_token=${this.options.token}`, {
      method: 'POST',
      body: JSON.stringify(payload).replace(/\\\\/g, '\\'),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        if (result.errcode > 0) {
          console.error('send failed for: %s', result.errmsg)
          !this._quiet && process.exit(1)
        }
      })
  }

  async message(text) {
    await this._send({
      msgtype: 'text',
      text: {
        content: text
      },
      at: {
        atMobiles: this.options.at,
        isAtAll: this.options.isAtAll
      }
    })
  }

  async link(url, opt) {
    await this._send({
      msgtype: 'link',
      link: {
        text: opt.content || url,
        title: opt.title || url,
        picUrl: opt.pic || url,
        messageUrl: url
      }
    })
  }

  async markdown(markdown, opt) {
    await this._send({
      msgtype: 'markdown',
      markdown: {
        title: opt.title || this.options.defaultTitle,
        text: markdown
      },
      at: {
        atMobiles: this.options.at,
        isAtAll: this.options.isAtAll
      }
    })
  }

  async actionCard(text, opt) {
    await this._send({
      actionCard: {
        title: opt.title || this.options.defaultTitle,
        text,
        hideAvatar: opt.hideAvatar,
        btnOrientation: opt.btnOrientation,
        ...(opt.btns.length > 0 && { btns: opt.btns }),
        ...(opt.btns.length < 1 && {
          singleTitle: opt.singleTitle || this.options.defaultBtnText,
          singleURL: opt.singleURL || ''
        })
      },
      msgtype: 'actionCard'
    })
  }

  async feedCard(main, opt, others = []) {
    await this._send({
      feedCard: {
        links: [parseFeed(main), ...others.map(parseFeed)]
      },
      msgtype: 'feedCard'
    })
  }
}

module.exports = Robot
