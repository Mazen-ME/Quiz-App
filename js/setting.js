import { Quiz } from "./quiz.js";
export class Setting {
    constructor() {

        this.catrgoryInput = document.getElementById('category');
        this.difficultyInput = document.getElementsByName('difficulty');
        this.numberOfQuestionsInput = document.getElementById('numberOfQuestions');
        this.startBtn = document.getElementById('startBtn');
        this.startBtn.addEventListener('click', this.startQuiz.bind(this));

    }

    async startQuiz() {
        let category = this.catrgoryInput.value;
        let numberOfQuestions = this.numberOfQuestionsInput.value;
        let difficulty = Array.from(this.difficultyInput).filter(el => el.checked)[0].value;
        let Api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty${difficulty}&type=multiple`
        let resbo = await this.fetchApi(Api)
        if (resbo.length > 0) {
            $('#setting').fadeOut(300, () => {
                $('#quiz').fadeIn(200)
            })
        }

        let quiz =new Quiz(resbo)
    }

    async fetchApi(Api) {
        let response = await fetch(Api)
        let result = await response.json()
        return result.results
    }


}

