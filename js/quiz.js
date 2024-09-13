
export class Quiz {

    constructor(resbo) {
        this.resbo = resbo
        this.numOfQues = resbo.length
        this.currentQues = 0
        this.answeElement = document.getElementsByName('answer')
        this.score = 0;
        this.nextQues = document.getElementById('next')
        this.nextQues.addEventListener('click', this.nextQuestion.bind(this))

        this.displayQuestions()

    }

    displayQuestions() {

        document.getElementById('question').innerHTML = this.resbo[this.currentQues].question
        document.getElementById('currentQuestion').innerHTML = this.currentQues + 1
        document.getElementById('totalNumberOfQuestions').innerHTML = this.numOfQues
        let answers = [this.resbo[this.currentQues].correct_answer, ...this.resbo[this.currentQues].incorrect_answers]
        function shuffle(answers) {
            let currentIndex = answers.length, randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [answers[currentIndex], answers[randomIndex]] = [
                    answers[randomIndex], answers[currentIndex]];
            }

            return answers;
        }
        let anserArr = shuffle(answers)

        let temp = ``

        for (let i = 0; i < anserArr.length; i++) {

            temp += `
            <div class='form-check'>
            <label class='form-form-check-label'>
            <input type='radio' class='form-form-check-input' name='answer' value='${anserArr[i]}'>
            ${anserArr[i]}
            </label>
            
            </div>
            `
            document.getElementById('rowAnswer').innerHTML = temp
        }

    }
    nextQuestion() {
        let userAnswer = [...this.answeElement].filter(ele => ele.checked)
        if (userAnswer.length === 1) {
            $('#alert').fadeOut(200)
            this.checkanswer()
            this.currentQues++
            if (this.currentQues === this.numOfQues) {
                $('#quiz').fadeOut(200, () => {
                    $('#finish').fadeIn(300)
                })
                document.getElementById('score').innerHTML = this.score
                document.getElementById('tryBtn').addEventListener('click', () => {
                    $('#finish').fadeOut(200, () => {
                        $('#setting').fadeIn(300)
                    })
                })
            }
            else {
                this.displayQuestions()
            }
        }
        else{
            $('#alert').fadeIn(200)
        }
    
    }
    checkanswer() {
        let userAnswer = [...this.answeElement].filter(ele => ele.checked)[0].value
        let correctAnswer = this.resbo[this.currentQues].correct_answer
        if (userAnswer === correctAnswer) {
            this.score++
            $('#Correct').fadeIn(200, () => {
                $('#Correct').fadeOut(1000)
            })
        }
        else {
            $('#inCorrect').fadeIn(200, () => {
                $('#inCorrect').fadeOut(1000)
            })

        }
    }

}