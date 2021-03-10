const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('div-progress-bar-full');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'TENDO FECHADO todas as portas, foram sossegadamente para casa. ',
        choice1: 'Infinitivo Pessoal Composto',
        choice2: 'Gerúndio Composto',
        choice3: 'Condicional Composto',
        choice4: 'Gerúndio Simples',
        answer: 2
    },
    {
        question: 'Ele sempre ______ chocolate para os amigos.',
        choice1: 'traz',
        choice2: 'tráz',
        choice3: 'trás',
        choice4: 'tras',
        answer: 1
    },
    {
        question: 'Qual o maior planeja do sistema solar?',
        choice1: 'Urano',
        choice2: 'Saturno',
        choice3: 'Marte',
        choice4: 'Júpiter',
        answer: 4
    },
    {
        question: 'Quem desenhou a politica de expansão portuguesa no Oriente?',
        choice1: 'Afonso de Albuquerque',
        choice2: 'Infante D. Henrique',
        choice3: 'D. Afonso Henriques ',
        choice4: 'D. Sancho II',
        answer: 1
    },
    {
        question: 'Qual das expressões seguintes é equivalente a (x-2)² + 6x ?',
        choice1: 'x² + 2x + 4',
        choice2: 'x² + 6x + 4',
        choice3: 'x² + 10x - 4',
        choice4: 'x² + 6x - 4',
        answer: 1
    },
    {
        question: 'Qual língua mais influenciou na criação da língua portuguesa?',
        choice1: 'Mirandês',
        choice2: 'Latim',
        choice3: 'Espanhol',
        choice4: 'Gaulês',
        answer: 2
    },
    {
        question: 'Um avicultor comprou 5.300 pintos nascidos há um dia para povoar um aviário. Ao chegar à granja, percebeu que morreram 106 pintinhos. A taxa de mortalidade foi de:',
        choice1: '3,5%',
        choice2: '3%',
        choice3: '1,5%',
        choice4: '2%',
        answer: 4
    },
    {
        question: 'Um avião levanta vôo sob um ângulo de 30º. Após percorrer em linha reta 5.000 metros a que distância encontra-se do solo?',
        choice1: '250m',
        choice2: '10km',
        choice3: '2,5km',
        choice4: '5km',
        answer: 3
    },
    {
        question: 'No sudoeste da Europa, localiza-se:',
        choice1: 'a península da Escandinávia.',
        choice2: 'a península dos Balcãs.',
        choice3: 'a península Ibérica.',
        choice4: 'os países Bálticos.',
        answer: 3
    },
    {
        question: 'Nos verbos, o modo conjuntivo expressa ',
        choice1: 'Dúvida, incerteza',
        choice2: 'Ordem',
        choice3: 'Certeza',
        choice4: 'Indecisão',
        answer: 1
    },
]
// console.log(questions)
// let comp = questions.length
// console.log(comp)
const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    /* Verifica se atingiu o limite de perguntas */
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    /* Adiciona ao contador e bar de progresso*/
    questionCounter++
    progressText.innerText =`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    /* Nova pergunta */
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    /* Concaternar o data-number com o choice# */
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}
/* Escolha  */
choices.forEach (choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {

            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })

})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()