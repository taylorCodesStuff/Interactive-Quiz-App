
let state = {
  questionNum: 0,
  questionNumDisplay: 1,
  score: 0
};

function incrementQuestionNum() {
  state.questionNum++;
}

function incrementQuestionNumDisplay() {
  state.questionNumDisplay++;
}

function incrementScore() {
  state.score++;
}

function updateScoreDisplay() {
  $('.score').text(state.score);
}

function updateQuestionNumDisplay() {
  // Update display of question num

  $('.questionNum').text(state.questionNumDisplay);

  incrementQuestionNumDisplay();
}

function restartState() {
  state.questionNum = 0;
  state.questionNumDisplay = 1;
  state.score = 0;
}

function handleRestartButton() {
  $('.restart-btn').on('click', function(event){
    restartState();
    nextQuestion();
    updateQuestionNumDisplay();
    updateScoreDisplay();
  });
}

function handleNextButton() {
  $('.feedback-display').on('click', '.next-question-btn', function(event){

    incrementQuestionNum();

    if(state.questionNum < STORE.length){
      updateQuestionNumDisplay();
      nextQuestion();
    } else {
        $('.quizQuestionForm').html(renderResults());
        handleRestartButton();
    }
  });
}

function renderResults() {
  // Quiz is done display result
  return `
    <div class="feedback-display">
      <p>
        <span>Final Score: ${state.score} out of 10</span>
      </p>
      <button class="restart-btn">Play again?</button>
    </div>
  `; 
}

function answerIsCorrect() {
  let correctFeedback = `
  <div class="feedback-display">
    <p><b>Good Job you got it right!</b></p>
    <button class="next-question-btn">Next</button>
  </div>
  `;
  $('.quizQuestionForm').html(correctFeedback);
  incrementScore();
  updateScoreDisplay();
  handleNextButton();
}

function answerIsNotCorrect() {
  let incorrectFeedback = `
  <div class="feedback-display">
    <p>Better luck next time! The correct answer was
        <div class=""wrong-answer>
          <p><b>${STORE[state.questionNum].answer}</b></p>
        </div>
    </p>
    <button class="next-question-btn">Next</button>
  </div>
  `;
  $('.quizQuestionForm').html(incorrectFeedback);
  handleNextButton();
}

function handleSubmitButton() {
  $('form').on('submit', function(event){
    event.preventDefault();
    const correctAnswer = STORE[state.questionNum].answer;
    const selected = $('input:checked').val();
    
    if(correctAnswer === selected){
      answerIsCorrect();
    } else if(correctAnswer !== selected){
      answerIsNotCorrect();
    }
  });
}

function nextQuestion() {
  let result = `
        <div class="question">
            <h3 class="question-text">${STORE[state.questionNum].question}</h3>
            <form>
              <fieldset>
                <legend class="fieldsetLengend">Answer Choices</legend>
                <label class="answerOption">
                  <input type="radio" value="${STORE[state.questionNum].choices[0]}" name="choice" required>
                  <span>${STORE[state.questionNum].choices[0]}</span>
                </label>
                <label class="answerOption">
                  <input type="radio" value="${STORE[state.questionNum].choices[1]}" name="choice" required>
                  <span>${STORE[state.questionNum].choices[1]}</span>
                </label>
                <label class="answerOption">
                  <input type="radio" value="${STORE[state.questionNum].choices[2]}" name="choice" required>
                  <span>${STORE[state.questionNum].choices[2]}</span>
                </label>
                <label class="answerOption">
                  <input type="radio" value="${STORE[state.questionNum].choices[3]}" name="choice" required>
                  <span>${STORE[state.questionNum].choices[3]}</span>
                </label>
                <button type="submit" class="submitButton">Submit</button>
              </fieldset>
            </form>
          </div>
      `;
      
      $('.quizQuestionForm').html(result);
      $('.fieldsetLengend').text('');
      
      handleSubmitButton();
}

function handleStartButton() {
  $('.quizStart').on('click', '.startButton', function(event){
    $('.quizStart').html('');
    nextQuestion();
    updateQuestionNumDisplay();
  });
}

function startPage() {
  handleStartButton();
}


$(startPage)