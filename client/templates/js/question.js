Template.question.events({
	'submit form': function(event){
		event.preventDefault();
		var answer = $('input[type="radio"]:checked').val();

		var data = Questions.findOne({_id: Session.get("currentQuestion")});
		
		var i;
		for (i = 0; i < data.answers.length && data.answers[i] != answer; ++i); ++i;
		if (i == data.correctAnswer)
			$("#message").html("BRAVO BOSS AI NENOROCIT INTREBAREA!");
		else
			$("#message").html("PARE RAU MAESTRE DAR SI CU BACUL LOAT SI FARA PACANELELE TOT DUBLEAZA BANII");
	}
});