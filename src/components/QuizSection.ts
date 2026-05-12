type QuizQuestion = {
  id: number;
  text: string;
  options: string[];
  images: string[];
};

export class QuizSection {
  private container: HTMLElement;
  private currentQuestion = 0;
  private answers: string[] = [];
  private questions: QuizQuestion[] = [
    {
      id: 1,
      text: "Выберите тип Вашей крыши",
      options: [
        "Односкатная",
        "Двускатная",
        "Четырехскатная вальмовая",
        "Четырехскатная шатровая",
        "Мансардная ломаная",
        "Другая",
      ],
      images: [
        "https://placehold.co/230x125",
        "https://placehold.co/230x125",
        "https://placehold.co/230x125",
        "https://placehold.co/230x125",
        "https://placehold.co/230x125",
        "https://placehold.co/230x125",
      ],
    },
  ];

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) throw new Error(`Container ${containerId} not found`);
    this.container = element;
    this.init();
  }

  private init() {
    this.render();
  }

  private render() {
    const question = this.questions[0];

    this.container.innerHTML = `
      <div class="relative z-10">
        <div class="text-center mb-8">
          <span class="text-yellow-400 text-3xl font-gilroy">Вопрос ${this.currentQuestion + 1} из ${this.questions.length}:</span>
          <span class="text-zinc-700 text-3xl font-gilroy"> ${question.text}</span>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${question.options
            .map(
              (option, idx) => `
            <div class="quiz-option bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-xl" data-option="${idx}">
              <img src="${question.images[idx]}" alt="${option}" class="w-full h-32 object-cover rounded-lg mb-3">
              <p class="text-center font-gilroy text-zinc-700">${option}</p>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="flex justify-between gap-4">
          <button class="quiz-prev px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full ${this.currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""}" ${this.currentQuestion === 0 ? "disabled" : ""}>
            Назад
          </button>
          <button class="quiz-next px-8 py-3 btn-gradient rounded-full">
            ${this.currentQuestion === this.questions.length - 1 ? "Получить результат" : "Далее"}
          </button>
        </div>
        
        <div class="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="bg-yellow-400 h-2 rounded-full transition-all duration-300" style="width: ${((this.currentQuestion + 1) / this.questions.length) * 100}%"></div>
        </div>
      </div>
    `;

    // Добавляем обработчики
    const options = this.container.querySelectorAll(".quiz-option");
    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        options.forEach((o) =>
          o.classList.remove("selected", "border-yellow-400", "bg-yellow-50"),
        );
        opt.classList.add(
          "selected",
          "border-2",
          "border-yellow-400",
          "bg-yellow-50",
        );
        const optionIdx = opt.getAttribute("data-option");
        if (optionIdx) {
          this.answers[this.currentQuestion] =
            this.questions[this.currentQuestion].options[parseInt(optionIdx)];
        }
      });
    });

    const nextBtn = this.container.querySelector(".quiz-next");
    nextBtn?.addEventListener("click", () => this.nextQuestion());

    const prevBtn = this.container.querySelector(".quiz-prev");
    prevBtn?.addEventListener("click", () => this.prevQuestion());
  }

  private nextQuestion() {
    if (!this.answers[this.currentQuestion]) {
      alert("Пожалуйста, выберите вариант ответа");
      return;
    }

    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
      this.render();
    } else {
      this.showResults();
    }
  }

  private prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.render();
    }
  }

  private showResults() {
    alert(
      "Спасибо за прохождение теста! Мы подготовим для вас расчет стоимости кровли и свяжемся в ближайшее время.",
    );
    console.log("Answers:", this.answers);
  }
}
