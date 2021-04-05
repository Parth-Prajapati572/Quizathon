const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which command is used to run a process in the background of Linux process management? ',
        choice1: '&',
        choice2: '?',
        choice3: '*',
        choice4: '|',
        answer: 1,
    },
    {
        question: 'What is fork( ) system ? ',
        choice1: 'used to create a new process from an existing process. ',
        choice2: 'An instance of a program.',
        choice3: 'is any command or task you run directly and wait for it to complete.',
        choice4: 'used to find the process ID of a running program.',
        answer: 1,
    },
    {
        question: 'Select the incorrect method to start a new process.',
        choice1: 'The shell executes a fork( ) and then the selected program is loaded into memory via an exec( ).',
        choice2: 'The shell executes a fork( ) and then the selected program is loaded into memory via another shell( ).',
        choice3: 'The shell executes a fork( ) and then the selected program is loaded into memory via another fork( ).',
        choice4: 'None of the above.',
        answer: 3,
    },
    {
        question: 'Which one of the following is a reason for which a parent process may terminate the execution of one of its children processes:',
        choice1: 'The parent is exiting, and the operating system does not allow a child to continue if its parent terminates',
        choice2: 'The task assigned to the child is no longer required.',
        choice3: 'The child has exceeded its usage of some of the resources allocated to it.',
        choice4: 'Any of the above.',
        answer: 4,
    },
    {
        question: 'How Process synchronization of programs is done in Linux process management? ',
        choice1: 'input',
        choice2: 'output memory',
        choice3: 'operating system',
        choice4: 'None of the above.',
        answer: 3,
    },
    {
        question: 'What does the fork () system call returns? ',
        choice1: 'a value of 0 to the child process.',
        choice2: 'The process ID of the child process to the parent process.',
        choice3: 'a value of -1 to the parent process if no child process is created.',
        choice4: 'All of the above.',
        answer: 4,
    },
    {
        question: 'Select the mechanisms/techniques of Inter Process Communication (IPC) ',
        choice1: 'Signals, Pipes and Threads',
        choice2: 'Pipes, signals and message passing',
        choice3: 'Threads, pipes and message passing',
        choice4: 'Message Passing, Signals and Threads',
        answer: 2,
    },
    {
        question: 'Which of the following happens when a process creates a new process? ',
        choice1: 'The parent can execute only after all its children have executed and terminated',
        choice2: 'The parent continues to execute concurrently with its children',
        choice3: 'A child can execute only after its parent has terminated',
        choice4: 'None of the above.',
        answer: 2,
    },
    {
        question: 'What does the major objective of process cooperation include ? ',
        choice1: 'Computation Speedup',
        choice2: 'Modularity',
        choice3: 'Information Sharing',
        choice4: 'All of the above.',
        answer: 4,
    },
    {
        question: 'Describe “cascaded termination”. ',
        choice1: 'Least recent child process is terminated when the parentis terminated',
        choice2: 'All user-space processes are killed',
        choice3: 'All child processes are terminated when the parentis terminated.',
        choice4: 'Most recent child process is terminated when the parent is terminated',
        answer: 3,
    },
    {
        question: 'What are the different ways mounting of the file system? ',
        choice1: 'boot mounting',
        choice2: 'auto mounting',
        choice3: 'explicit mounting',
        choice4: 'all of the mentioned',
        answer: 4,
    },
    {
        question: 'What is the mount point?',
        choice1: 'an empty directory at which the mounted file system will be attached',
        choice2: 'a location where every time file systems are mounted',
        choice3: 'is the time when the mounting is done',
        choice4: 'none of the mentioned',
        answer: 1,
    },
    {
        question: 'A mount operation includes the ___',
        choice1: 'name of the network',
        choice2: 'name of the remote directory to be mounted',
        choice3: 'name of the server machine storing it',
        choice4: 'all of the mentioned.',
        answer: 2,
    },
    {
        question: "A file named employees.odt has a mode of rw-r--r--. If rtracy is the file's owner, what can he do with it? ",
        choice1: "He can open the file and view its contents, but he can't save any changes.",
        choice2: 'He can open the file, make changes, and save the file.',
        choice3: 'He can change ownership of the file.',
        choice4: "He can run the file if it's an executable.",
        answer: 2,
    },
    {
        question: 'An executable file has the SUID permission set. If this file is run on the system, who owns the file? ',
        choice1: 'The user who created the file remains the owner.',
        choice2: 'The user who ran the file becomes the file permanent owner.',
        choice3: 'The user who ran the file becomes the file temporary owner.',
        choice4: 'The root user becomes the file owner.',
        answer: 3,
    }
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    
    acceptingAnswers = true
}

choices.forEach(choice => {
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
    score +=num
    scoreText.innerText = score
}

startGame()