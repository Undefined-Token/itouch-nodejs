const itouch = require('./main')

async function test() {
    console.log('开始测试连接...')
    
    // 创建客户端实例，连接到 192.168.31.15
    const client = new itouch({
        host: '192.168.31.15',
        port: 23188
    })

    // 注册 device:online 事件监听器
    client.on('device:online', (data) => {
        console.log('收到 device:online 事件:', data)
    })

    // 注册 device:offline 事件监听器
    client.on('device:offline', (data) => {
        console.log('收到 device:offline 事件:', data)
    })

    console.log('正在连接到 ws://192.168.31.15:23188...')
    await client.connect()
    console.log('连接成功!')
    console.log('等待 device:online 和 device:offline 事件...')

    // 测试 sendKey 命令
    console.log('测试 sendKey 命令...')
    const result = await client.invoke("sendKey", {
        deviceId: `P60904DC8D3F`,
        key: 'h',
        fnkey: 'COMMAND'
    })
    console.log('sendKey 调用结果:', result)

    client.destroy()
    
    console.log('客户端已销毁')
}

// 运行测试
test().catch(error => {
    console.error('未捕获的错误:', error)
})

// 保持程序运行
console.log('程序运行中，按 Ctrl+C 退出...')

