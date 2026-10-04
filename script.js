const questions = [
    {
        question: "Что тебе ближе всего и интереснее создавать?",
        options: [
            { text: "Сайты и веб-приложения", lang: "js" },
            { text: "Искусственный интеллект, анализ данных, скрипты", lang: "python" },
            { text: "Мобильные приложения для Android/iOS", lang: "kotlin" },
            { text: "Серьезные компьютерные игры (на Unity/Unreal)", lang: "csharp" }
        ]
    },
    {
        question: "Насколько важен для тебя простой и понятный синтаксис на старте?",
        options: [
            { text: "Максимально простой, чтобы сразу писать код без лишних символов", lang: "python" },
            { text: "Хочу сразу видеть результат в браузере (кнопки, анимации)", lang: "js" },
            { text: "Готов изучать строгие правила и типы данных ради надежности", lang: "csharp" },
            { text: "Мне всё равно, главное — чтобы язык был популярным", lang: "kotlin" }
        ]
    },
    {
        question: "Куда ты планируешь развиваться в будущем?",
        options: [
            { text: "Fullstack / Frontend веб-разработка", lang: "js" },
            { text: "Data Science, Machine Learning, автоматизация", lang: "python" },
            { text: "Геймдев (разработка игр)", lang: "csharp" },
            { text: "Мобильная разработка", lang: "kotlin" }
        ]
    }
];

const resultsInfo = {
    python: {
        title: "Python (Пайтон)",
        desc: "Идеальный выбор для новичка! У него очень простой английский синтаксис. На нем пишут нейросети, сайты (бэкенд), парсеры и занимаются наукой о данных. Порог вхождения низкий, а возможностей — масса."
    },
    js: {
        title: "JavaScript (ДжаваСкрипт)",
        desc: "Главный язык интерактивного интернета. Если хочешь создавать сайты, которые оживают при кликах и анимациях, учи JS. Его огромный плюс — результат виден сразу в браузере."
    },
    csharp: {
        title: "C# (Си-шарп)",
        desc: "Отличный выбор, если твоя цель — разработка игр на движке Unity или серьезных корпоративных программ под Windows. Строгий, логичный и мощный язык."
    },
    kotlin: {
        title: "Kotlin (Котлин)",
        desc: "Современный, лаконичный и официальный язык для создания мобильных приложений под Android. Если хочешь делать крутые приложения для смартфона — начни с него."
    }
};

let currentQuestionIndex = 0;
let scores = { python: 0, js: 0, csharp: 0, kotlin: 0 };
let selectedLang = null;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const resultContent = document.getElementById("result-content");

function showQuestion() {
    resetState();
    let currentQ = questions[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQ.question}`;

    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("option-btn");
        button.onclick = () => selectOption(button, option.lang);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";
    selectedLang = null;
}

function selectOption(button, lang) {
    const allBtns = optionsContainer.querySelectorAll(".option-btn");
    allBtns.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedLang = lang;
    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    if (selectedLang) {
        scores[selectedLang]++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    let bestLang = "python";
    let maxScore = -1;
    for (let lang in scores) {
        if (scores[lang] > maxScore) {
            maxScore = scores[lang];
            bestLang = lang;
        }
    }

    resultContent.innerHTML = `<h3>${resultsInfo[bestLang].title}</h3><p>${resultsInfo[bestLang].desc}</p>`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    scores = { python: 0, js: 0, csharp: 0, kotlin: 0 };
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    showQuestion();
}

showQuestion();
