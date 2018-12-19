# DINGTALK-ROBOT-CLI

A command line tools for easy using dingtalk robot

## Install

```bash
npm install -g dingtalk-robot-cli
# or
yarn global add dingtalk-robot-cli
# or without installation, just use npx
# npx dingtalk-robot-cli <cmd>
```

## Usage

### You should first set access token by setting env or pass through an option

```bash
dingtalk-robot-cli -t 'access_token' <cmd>
# OR
DT_ROBOT_TOKEN='access_token' dingtalk-robot-cli <cmd>
```

### global options

- `-t --token [token]` your dingtalk robot access token
- `-q --quiet` if sending message fail, the process will not exit with code 1
- `--at` pass in a list of mobile numbers, formatted by `mobile1,mobile2`
- `--isAtAll` if at all people

### message

send simple message

```bash
dingtalk-robot-cli message 'hello'
```

### link

send link message

```bash
dingtalk-robot-cli link 'http://baidu.com' --content 'link content text' --title 'link title' --pic 'some image url'
```

### markdown

send markdown message

```bash
dingtalk-robot-cli markdown '## some markdown content' --title 'message title'
```

### actionCard

send actionCard message

```bash
# single button
dingtalk-robot-cli actionCard '## some actionCard content' --title 'actionCard title' --hideAvatar --btnOrientation --singleTitle 'gobaidu' --singleURL 'http://baidu.com'


# multiple button
dingtalk-robot-cli actionCard '## some actionCard content' --title 'actionCard title' --hideAvatar --btnOrientation --btns 'gobaidu;http://baidu.com' --btns 'gogoogle;http://google.com'
```

### feedCard

send feedCard message

```bash
dingtalk-robot-cli feedCard 'GoBaidu;http://baidu.com;http://baidu.com/logo.png' 'GoGoogle;http://google.com;http://google.com/logo.png'
```

## Docker

```bash
docker run --rm dingtalk-robot-cli <CMD>
```
