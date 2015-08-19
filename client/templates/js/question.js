Template.question.events({
	'submit form': function(event){
		event.preventDefault();
		var answer = $('input[type="radio"]:checked').val();

		var data = Questions.findOne({_id: Session.get("currentQuestion")});
		
		var i;
		for (i = 0; i < data.answers.length && data.answers[i] != answer; ++i); ++i;
		if (i == data.correctAnswer)
			$("#message").html('<div class="alert alert-success" id="message">Ai raspuns corect!</div>');
		else
			$("#message").html('<div class="alert alert-danger" id="message">Raspunsul tau este gresit!</div>');
	},
	'click .quiz-choice': function(event) {
		
		$(".quiz-choice").removeClass('user-choice');

		event.currentTarget.classList.add('user-choice');	
	}
});

