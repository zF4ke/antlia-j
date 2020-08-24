import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.subscribe((command) => {
    //console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

function start() {
    const frequency = 7000

    setInterval(game.addFruit, frequency)
}
start()

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)

    game.addPlayer({playerId: playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId:playerId})
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })

    socket.on('login', (session) => {
        if(session.user === "admin" && session.password === "admin") {
            console.log('logged with admin')
        }
    })
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})