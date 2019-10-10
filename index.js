//global variables
//let score = 0;
//will track the index of the question
let currentQuestion = 0;

let totalQuestionsAnsweredCorrectly = 0;

//array of objects
let questions = [
  
  {
    title: "What are some reasons to celebrate?",
    answers: ["Birthday", "Graduation", "Retirement", "Feeling down", "All of the above"],
    correct: 4
   },
  
  {
    title: "Who should be invited to a party?",
    answers: ["Everyone you know", "Close friends only", "Immediate family", "Depends on the occasion", "Only those who can afford a gift"],
    correct: 3
   },

   {
    title: "What should no party should go without?",
    answers: ["Appetizers", "Cake", "A live band", "A clown", "Kids"],
    correct: 1
   },
  
   {
    title: "When is a great time to respond to a RSVP?",
    answers: ["The day of the event", "Never", "Immediately", "The day before the event", "All of the above"],
    correct: 2
   },
  
   {
    title: "Whose responsibility is it to host a party?",
    answers: ["Parents", "Friends", "Guests", "GoFundMe", "Depends on the occasion"],
    correct: 4
   },
  
   {
    title: "I cannot afford to have a party. What should I do?",
    answers: ["Wait until you can afford to have a party.", "Do not have a party", "Have a Potluck", "Charge an Entry fee", "Play the lottery"],
    correct: 0
   },
  
   {
    title: "I am going to a birthday party for my cousin, what should I buy her?",
    answers: ["Nothing", "Depends on her interests", "Regift what she bought you for your birthday", "Nothing more than $1.00", "A dog."],
    correct: 1
   },
  
   {
    title: "Should I have an Open bar at my party?",
    answers: ["Sure, if you can afford it.", "Sure, but consider the guests...are they drinkers?", "Sure, if the guests are over 21.", "Sure, but offer alternatives", "All of the above"],
    correct: 4
   },
  
   {
    title: "How can I host a great party?",
    answers: ["Hire someone", "Spend big bucks", "Book a famous entertainer", "Have a Disco ball", "Don't have any food"],
    correct: 0
   },
  
   {
    title: "How should I prepare for a party in home?",
    answers: ["Clean bathroom", "Put the animals away", "Clean home", "Buy food", "Clean bathroom again"],
    correct: 0
   },
  ];
  
//event listeners

//starts quiz
function startQuizGame(){
    addEventListeners();
}

//what happens when the start button is clicked
function addEventListeners(){
    $('.begin a, .again').click(function(e){
      //alert('clicked')
      e.preventDefault();
      currentQuestion = 0;
      totalQuestionsAnsweredCorrectly = 0;
      //the start button hides and the quiz questions appear
      $('.begin, .specifics, .more').hide();
      $('.quiz, #submit').show();
      //showQuestion function starts
      showQuestion();
    });
    
   /* $("input:radio").click(function(e){
      e.preventDefault();
      if($('#id').length){
        var guess = $('#id').attr('.id');
        console.log(guess);
     } else {
        alert('You must select and answer to continue');
      }
    });*/

    //when the nextQuestion is clicked
    $(".nextQuestion").click(function(e){
        e.preventDefault();
        showQuestion();
        //specifics class and more class clears out or resets
        $(".specifics, .more").text("")
        //the submit button should reappear but it does not
        //$("#submit").show();
        $("#submit, .nextQuestion, .results").toggle();
        })

    //$(".nextQuestion").click(function(){
    //    $("#submit, .nextQuestion, .results").toggle();
    //    })
         

    //when the submit button from the form is clicked
    $('#quizQuestions').submit(event=>{
     event.preventDefault();
         // alert('submitted')
      $('.results, .specifics, .more').show();
      let radioValue = $("input[name='Option']:checked").val();
      //compares the selected value with the correct value
      let correctAnswer = questions[currentQuestion].correct;
     // score += 1; 
      console.log("radio value = ", radioValue);
      //if no option is selected -- Please choose an option appears.
      if (radioValue===undefined){
        $(".specifics").text("Please choose an option.")
        $(".more, .results").css("display", "none")
      } else {
        if (radioValue==correctAnswer){
          totalQuestionsAnsweredCorrectly ++
          $('.more').text('You are correct!')
        } else {
          $('.more').text('Better luck next time.')
        }
        //if a value is selected, it shows what the correct answer is. 
        createSpecificText(radioValue, correctAnswer)
        //submit button should not show and nextQuestion button should show. (is toggle needed?)
        $("#submit").hide();
      }
      
     /* if (radioValue.checked){
      //if (console.log(`user answered ${radioValue} and correct answer is ${correctAnswer}`)){
          //hide submit button
        $("#submit").hide();
      } else {
        $("#submit").show();
      }
      */

     
      //compares the selected value versus the correct answer

         //go to next question
         currentQuestion++;

      //if currentQuestion index is greater than or equal to questions.length - show summary
      if (currentQuestion>=questions.length){
            showSummary();
      } else {
           //show next question button
        $(".nextQuestion").css("display", "block")
      }
    })
}
  //functions

  function showQuestion(){
    let questionObject = questions[currentQuestion];
    $('.quiz h3').text(questionObject.title);
    //MAY HAVE TO AMEND BELOW//
    //$('.quiz').html('');//
    //var inputTags = $("input[name='Option']").toArray();
    var labels= $("label").toArray();
    //console.log(inputTags)
    for(var i=0; i<questionObject.answers.length; i++){
    $(labels[i]).text(questionObject.answers[i])
     //$(inputTags[i]).val(questionObject.answers[i])
    }
    
  }
  //pass into function
  function checkAnswer(){
    let answer = questions[currentQuestion];
    if(correctAnswer === radioValue){
      score++;
    }
  }
   
  function showSummary(){
    $('.quiz').hide();
    $('.more').show();
    $('.results p').text ('You scored x out of "$(questions.length)"');
    $(".again").show();
  }

  function createSpecificText(radioValue, correctAnswer){
    let answerArray=questions[currentQuestion].answers;
    let usersAnswerString=answerArray[radioValue];
    let correctAnswerString=answerArray[correctAnswer];
    let totalQuestionsAnswered=currentQuestion+1
    let statString=`<ul><li>Correct Answers: ${totalQuestionsAnsweredCorrectly}</li><li>Total Questions Answered: ${totalQuestionsAnswered}</li></ul>`;
    let tallyString=`<p>You answered <mark>"${usersAnswerString}"</mark> and the correct answer should be <mark>"${correctAnswerString}".</mark></p>`;
    $(".specifics").html(tallyString+statString)
  }


 /* function getScore(){
    score=0
    var numQuestions=10;
    for (var i=0;i<numQuestions;i++){
    if (userInput[i]==answers[i]){
    score += 1;
    }
    else{
    score += 0;
    }
      
    }
    return score;
  }*/
 
  //function totalScore(){
  //("Your score is" +getScore()+"out of 10");
    
  function restartQuiz(){
    $('.more').hide();
    $('.quiz').show();
    newFunction();
    currentQuestion=0;
    showQuestion();

    //function new() {
    //  totalScore();
   // }
  }

$(startQuizGame)
