//Seleciona todos os elementos do DOM
const buttons = Array.from(document.getElementsByClassName('selectable')) //Cria um array dos elementos
const user_results = document.querySelector('#user-results')
const ai_results = document.querySelector('#ai-results')
const won_text = document.querySelector('#won-text')
const the_game = document.querySelector('.game-container')
const display_results = document.querySelector('.winner-container')
const display_score = document.querySelector('#score')
const reset_game = document.querySelector('#reset')

// Condições de vitória
const winner_combo = [
    {
        'selected': 'pedra',
        'beats': 'tesoura',
        'icon': '✊'
    },
    {
        'selected': 'papel',
        'beats': 'pedra',
        'icon': '✋'
    },
    {
        'selected': 'tesoura',
        'beats': 'papel',
        'icon': '✌️'
    },
]

let player_score = 0

buttons.forEach(button => {
    button.addEventListener('click', e => {
        switch (e.target.id) {
            case 'pedra':
                calculateWinner(winner_combo[0], ai_selected())
                break;
        
            case 'papel':
                calculateWinner(winner_combo[1], ai_selected())
                break;

            case 'tesoura':
                calculateWinner(winner_combo[2], ai_selected())
                break;
        }
    })
})

//Seleção aleatória pra IA
function ai_selected() {
    const randomIndex = Math.floor(Math.random() * winner_combo.length)
    return winner_combo[randomIndex]
}

//Determinar vencedor
function calculateWinner(user,ai) {
    if(user.beats == ai.selected) {
        display_score.innerHTML = player_score += 1
        updateUI(user,ai,'You Won!')
        return
    }
    if(user.selected == ai.selected) {
        updateUI(user,ai,'Draw!')
        return
    }
    if(ai.beats == user.selected) {
        if(player_score > 0) {
            display_score.innerHTML = player_score -= 1
        }
        updateUI(user,ai,'You Lost!')
        return
    }
}

//Atualização da UI
function updateUI(user,ai,outcome_text) {
    user_results.innerHTML = user.icon
    user_results.classList.add(`${user.selected}`)
    ai_results.innerHTML = ai.icon
    ai_results.classList.add(`${ai.selected}`)
    won_text.innerHTML = outcome_text
    the_game.classList.add('hide')
    display_results.classList.remove('hide')
}

//Função de reset para começar o jogo
reset_game.addEventListener('click', () => {
    the_game.classList.remove('hide')
    display_results.classList.add('hide')
    user_results.className = 'selectable'
    ai_results.className = 'selectable'
})