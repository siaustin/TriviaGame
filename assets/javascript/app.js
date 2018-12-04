var card = $('#quiz-area');
var countStartNumber = 30;

// Question set
var questions = [
  {
    question: 'Alibaba and Tencent are giant tech companies based in which country?',
    answers: ['Japan', 'Syria', 'China', 'Korea', 'United Kingdom'],
    correctAnswer: 'China',
    image: 'assets/images/china.jpg'
  },
  {
    question: 'What is the largest US state east of the Mississippi River?',
    answers: ['Michigan', 'Florida', 'Georgia', 'Wisconsin', 'Tennessee'],
    correctAnswer: 'Michigan',
    image: 'assets/images/michigan.png'
  },
  {
    question: 'Which country is known for their incredible street food?',
    answers: ['France', 'Ireland', 'El Salvador', 'Vietnam'],
    correctAnswer: 'Vietnam',
    image: 'assets/images/vietnam.jpeg'
  },
  {
    question: 'Which has a pink beach?',
    answers: ['Miami', 'Bermuda', 'Costa Rica', 'Tahiti'],
    correctAnswer: 'Bermuda',
    image: 'assets/images/bermuda.jpg'
  },
  {
    question: 'Where can you take a cruise down a fjord?',
    answers: ['Alaska', 'New Zealand', 'Germany', 'Norway'],
    correctAnswer: 'Norway',
    image: 'assets/images/fjord.jpg'
  },
  {
    question: 'Where can you float through an underground river out to sea?',
    answers: ['Oregon', 'Australia', 'Mexico', 'Germany'],
    correctAnswer: 'Mexico',
    image: 'assets/images/mexico.jpg'
  },
  {
    question: 'Which airport is in NYC?',
    answers: ["O'hare", 'Heathrow', 'Hartsfield-Jackson', 'JFK'],
    correctAnswer: 'JFK',
    image: 'assets/images/jfk.jpg'
  },
  {
    question:
      "Where is the only place in the world you can see marine iguanas, flightless cormorants and Darwin's finches?",
    answers: ['Madagascar', 'Costa Rica', 'Bolivia', 'Galapagos Islands'],
    correctAnswer: 'Galapagos Islands',
    image: 'assets/images/galapagos.jpg'
  }
];

// Variable to hold our setInterval
var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $('#counter-number').text(this.counter);
    if (this.counter === 0) {
      console.log('TIME UP');
      this.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);

    card.html('<h2>' + questions[this.currentQuestion].question + '</h2>');

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append(
        "<button class='answer-button' id='button' data-name='" +
          questions[this.currentQuestion].answers[i] +
          "'>" +
          questions[this.currentQuestion].answers[i] +
          '</button>'
      );
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $('#counter-number').text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {
    clearInterval(window.timer);

    $('#counter-number').text(this.counter);

    card.html("<h2>Time's Up!</h2>");
    card.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    } else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(window.timer);

    card.html('<h2>Your Results...</h2>');

    $('#counter-number').text(this.counter);

    card.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    card.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
    card.append('<h3>Unanswered: ' + (questions.length - (this.incorrect + this.correct)) + '</h3>');
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr('data-name') === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    this.incorrect++;

    clearInterval(window.timer);

    card.html('<h2>Nope!</h2>');
    card.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer + '</h3>');
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(window.timer);

    this.correct++;

    card.html('<h2>Correct!</h2>');
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$(document).on('click', '#start-over', game.reset.bind(game));

$(document).on('click', '.answer-button', function(e) {
  game.clicked.bind(game, e)();
});

$(document).on('click', '#start', function() {
  $('#sub-wrapper').prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});
