const fullQuestionSet = [
  // 🧠 Reasoning Questions
  {
    question: "If RED is called SUN, SUN is called STAR, and YELLOW is called RED, what is the color of the STAR?",
    options: ["Yellow", "Sun", "Red", "Star"],
    answer: "Yellow"
  },
  {
    question: "My sister's husband's brother is my ___?",
    options: ["Uncle", "Father", "Brother-in-law", "Cousin"],
    answer: "Brother-in-law"
  },
  {
    question: "If 3x = 12, what is x?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "A is the father of B. But B is not the son of A. How is it possible?",
    options: ["B is A's daughter", "B is A's friend", "A is lying", "B is A's uncle"],
    answer: "B is A's daughter"
  },
  {
    question: "Find the odd one out: Apple, Banana, Mango, Potato",
    options: ["Apple", "Banana", "Mango", "Potato"],
    answer: "Potato"
  },
  {
    question: "If Monday is called Friday, Friday is called Wednesday, and Wednesday is called Sunday, then what is the third day of the week?",
    options: ["Friday", "Wednesday", "Sunday", "Monday"],
    answer: "Sunday"
  },
  {
    question: "Which word is different: Fan, Table, Chair, Sofa",
    options: ["Fan", "Table", "Chair", "Sofa"],
    answer: "Fan"
  },
  {
    question: "What comes next: 2, 4, 8, 16, ___?",
    options: ["18", "24", "32", "20"],
    answer: "32"
  },
  {
    question: "My aunt’s son is my ___?",
    options: ["Brother", "Cousin", "Uncle", "Nephew"],
    answer: "Cousin"
  },
  {
    question: "If North becomes South and East becomes West, what will West become?",
    options: ["East", "South", "North", "West"],
    answer: "East"
  },

  // 🌍 Factual Questions
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: "Tokyo"
  },
  {
    question: "What gas do plants absorb from the air?",
    options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
    answer: "Carbon Dioxide"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Ganga", "Nile", "Yamuna"],
    answer: "Nile"
  },
  {
    question: "Who invented the light bulb?",
    options: ["Newton", "Einstein", "Thomas Edison", "Faraday"],
    answer: "Thomas Edison"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which organ purifies blood?",
    options: ["Lungs", "Heart", "Liver", "Kidney"],
    answer: "Kidney"
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "95°C"],
    answer: "100°C"
  },
  {
    question: "Which country has the Eiffel Tower?",
    options: ["France", "Germany", "Italy", "Spain"],
    answer: "France"
  },
  {
    question: "Which is the largest ocean in the world?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    answer: "Pacific"
  }
];

// 👇 The rest of your quiz logic (already working fine) remains unchanged and should follow after this.
// Includes: getRandomQuestions(), showQuestion(), moveToNext(), showResult(), and window.onload...
let questions = [];
let currentIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let selectedOption = null;
let wrongAnswers = [];
let skipped = [];
let attempted = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next");
const skipBtn = document.getElementById("skip");
const submitBtn = document.getElementById("submit");
const timerEl = document.getElementById("time");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const detailsEl = document.createElement("div");

function getRandomQuestions() {
  return [...fullQuestionSet].sort(() => Math.random() - 0.5).slice(0, 20);
}

function startTimer() {
  timeLeft = 30;
  timerEl.innerText = timeLeft;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      if (!skipped.includes(questions[currentIndex])) {
        skipped.push(questions[currentIndex]);
      }
      moveToNext();
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.innerText = `${currentIndex + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  selectedOption = null;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      selectedOption = option;
      document.querySelectorAll("#options button").forEach(b => b.style.background = "#337ab7");
      btn.style.background = "#5cb85c";
      nextBtn.disabled = false;
    };
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
  startTimer();
}

function moveToNext() {
  if (selectedOption) {
    attempted++;
    if (selectedOption === questions[currentIndex].answer) {
      score++;
    } else {
      wrongAnswers.push({
        ...questions[currentIndex],
        yourAnswer: selectedOption
      });
    }
  } else if (!skipped.includes(questions[currentIndex])) {
    skipped.push(questions[currentIndex]);
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  moveToNext();
});

skipBtn.addEventListener("click", () => {
  clearInterval(timer);
  if (!skipped.includes(questions[currentIndex])) {
    skipped.push(questions[currentIndex]);
  }
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  showResult();
});

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");

  let wrongCount = wrongAnswers.length;
  let skippedCount = skipped.length;

  resultEl.innerHTML = `<h2>Quiz Summary</h2>
    <p>Total Questions: ${questions.length}</p>
    <p>Attempted: ${attempted}</p>
    <p>Correct: ${score}</p>
    <p>Wrong: ${wrongCount}</p>
    <p>Skipped: ${skippedCount}</p>`;

  if (wrongCount > 0) {
    let html = `<h3>Wrong Answers Review</h3><ul>`;
    wrongAnswers.forEach((item, i) => {
      html += `<li>
        Q${i + 1}: ${item.question} <br>
        Your answer: <b style="color:red;">${item.yourAnswer}</b><br>
        Correct answer: <b style="color:green;">${item.answer}</b>
      </li><br>`;
    });
    html += `</ul>`;
    detailsEl.innerHTML = html;
    resultEl.appendChild(detailsEl);
  }

  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Restart Quiz";
  restartBtn.onclick = () => location.reload();
  resultEl.appendChild(restartBtn);

  // Hide control buttons after result
  nextBtn.style.display = "none";
  skipBtn.style.display = "none";
  submitBtn.style.display = "none";
}

window.onload = () => {
  questions = getRandomQuestions();
  showQuestion();
};
