export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId, screenSize) {
    const context = screen.getContext('2d')

    screen.width = screenSize.width
    screen.height = screenSize.height

    context.fillStyle = 'white'
    context.clearRect(0, 0, screenSize.width, screenSize.height)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'rgb(0,0,0, 0.3)'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = '#6cda3f'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId, screenSize)
    })
}