// Quiz Terra - JavaScript
class TerraQuiz {
    constructor() {
        this.questions = [
            {
                question: "En quelle année le satellite Terra a-t-il été lancé ?",
                options: ["1997", "1999", "2001", "2003"],
                correct: 1,
                explanation: "Terra a été lancé le 18 décembre 1999 depuis la base de Vandenberg en Californie."
            },
            {
                question: "Quel est le nom de l'instrument qui mesure la température et l'humidité de l'atmosphère ?",
                options: ["MODIS", "CERES", "MOPITT", "MISR"],
                correct: 2,
                explanation: "MOPITT (Measurements of Pollution in the Troposphere) mesure les concentrations de monoxyde de carbone dans la troposphère."
            },
            {
                question: "Combien d'instruments scientifiques Terra transporte-t-il ?",
                options: ["3", "4", "5", "6"],
                correct: 2,
                explanation: "Terra transporte 5 instruments : MODIS, CERES, MOPITT, MISR et ASTER."
            },
            {
                question: "Quel instrument produit des images stéréoscopiques de la Terre ?",
                options: ["MODIS", "CERES", "MISR", "ASTER"],
                correct: 2,
                explanation: "MISR (Multi-angle Imaging SpectroRadiometer) capture des images sous 9 angles différents pour créer des vues stéréoscopiques."
            },
            {
                question: "Quelle est l'altitude orbitale de Terra ?",
                options: ["400 km", "600 km", "705 km", "800 km"],
                correct: 2,
                explanation: "Terra orbite à environ 705 km d'altitude avec une inclinaison de 98,2°."
            },
            {
                question: "Quel instrument mesure le budget énergétique de la Terre ?",
                options: ["MODIS", "CERES", "MOPITT", "ASTER"],
                correct: 1,
                explanation: "CERES (Clouds and the Earth's Radiant Energy System) mesure l'énergie entrante et sortante de la Terre."
            },
            {
                question: "Combien de temps faut-il à Terra pour faire un tour complet de la Terre ?",
                options: ["90 minutes", "100 minutes", "110 minutes", "120 minutes"],
                correct: 1,
                explanation: "Terra fait un tour complet de la Terre en environ 100 minutes."
            },
            {
                question: "Quel instrument est développé par le Japon ?",
                options: ["MODIS", "CERES", "MOPITT", "ASTER"],
                correct: 3,
                explanation: "ASTER (Advanced Spaceborne Thermal Emission and Reflection Radiometer) est développé par la JAXA japonaise."
            },
            {
                question: "Quelle est la résolution spatiale maximale de MODIS ?",
                options: ["250m", "500m", "1km", "2km"],
                correct: 0,
                explanation: "MODIS peut atteindre une résolution spatiale de 250 mètres dans certaines bandes spectrales."
            },
            {
                question: "Quel phénomène Terra peut-il observer depuis l'espace ?",
                options: ["Les ouragans", "La déforestation", "Les feux de forêt", "Toutes ces réponses"],
                correct: 3,
                explanation: "Terra peut observer tous ces phénomènes grâce à ses différents instruments et à sa couverture globale."
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.timer = null;
        this.gameStarted = false;
        
        this.init();
    }
    
    init() {
        this.showQuestion();
        this.startTimer();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const questionNumber = document.getElementById('question-number');
        
        questionText.textContent = question.question;
        questionNumber.textContent = this.currentQuestion + 1;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-btn';
            button.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(button);
        });
        
        // Afficher le conteneur de question et masquer les autres
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('final-score').style.display = 'none';
    }
    
    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        if (isCorrect) {
            this.score += 10;
            // Bonus pour réponse rapide
            if (this.timeLeft > 20) {
                this.score += 5;
            }
        }
        
        this.showResult(isCorrect, question.explanation);
    }
    
    showResult(isCorrect, explanation) {
        const resultText = document.getElementById('result-text');
        const explanationText = document.getElementById('explanation-text');
        
        resultText.textContent = isCorrect ? '✅ Correct !' : '❌ Incorrect';
        resultText.style.color = isCorrect ? '#4ecdc4' : '#ff6b6b';
        explanationText.textContent = explanation;
        
        // Masquer la question et afficher le résultat
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        
        // Mettre à jour le score
        document.getElementById('score').textContent = this.score;
        
        // Arrêter le timer
        this.stopTimer();
        
        // Préparer la question suivante
        document.getElementById('next-question').onclick = () => this.nextQuestion();
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= this.questions.length) {
            this.showFinalScore();
        } else {
            this.timeLeft = 30;
            this.startTimer();
            this.showQuestion();
        }
    }
    
    showFinalScore() {
        const finalScoreValue = document.getElementById('final-score-value');
        const performanceMessage = document.getElementById('performance-message');
        
        finalScoreValue.textContent = this.score;
        
        let message = '';
        if (this.score >= 90) {
            message = '🌟 Excellent ! Vous êtes un expert de Terra !';
        } else if (this.score >= 70) {
            message = '👍 Très bien ! Vous connaissez bien Terra.';
        } else if (this.score >= 50) {
            message = '📚 Pas mal ! Continuez à apprendre sur Terra.';
        } else {
            message = '🚀 Continuez à explorer les mystères de Terra !';
        }
        
        performanceMessage.textContent = message;
        
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('final-score').style.display = 'block';
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timer').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    timeUp() {
        this.stopTimer();
        const correctAnswer = this.questions[this.currentQuestion].options[this.questions[this.currentQuestion].correct];
        this.showResult(false, `Temps écoulé ! La bonne réponse était : ${correctAnswer}`);
    }
}

// Fonction pour redémarrer le quiz
function restartQuiz() {
    window.location.reload();
}

// Initialiser le quiz quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new TerraQuiz();
});

// Styles pour les boutons d'options
const style = document.createElement('style');
style.textContent = `
    .option-btn {
        display: block;
        width: 100%;
        padding: 15px 20px;
        margin: 10px 0;
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
        border: 2px solid #5a5a9a;
        border-radius: 8px;
        font-size: 1em;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .option-btn:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border-color: #7a7aba;
        transform: translateY(-2px);
    }
    
    #options-container {
        margin-top: 20px;
    }
`;
document.head.appendChild(style);
