Template.question.helpers({
	'starsFulls': function() {
		var starsFulls = [];
		for (var i = 1; i <= this.question.dificulty; ++i)
			starsFulls.push('');
		return starsFulls;

	},
	'starsEmpty': function() {
		var starsEmpty = [];
		for (var i = 1; i <= 5 - this.question.dificulty; ++i)
			starsEmpty.push('');
		return starsEmpty;
	},
	getNextQuestion: function() {
		var lastRoute = Session.get("lastRoute");
		var regex = '^/' +  lastRoute;
		var string = {_id: {$ne: this.question._id}, path: {$regex: regex }};

		return Questions.findOne(string);
	},
	showMessage: function() {
		return Session.get("showMessage");
	},
	successMessage: function() {
		return Session.get("successMessage");
	}

});

Template.question.events({
	'submit form': function(event){
		event.preventDefault();
		var answer = $('input[type="radio"]:checked').val();

		var data = Questions.findOne({_id: Session.get("currentQuestion")});
		
		var i;
		for (i = 0; i < data.answers.length && data.answers[i] != answer; ++i); ++i;
		if (i == data.correctAnswer) {
			Session.set("showMessage", true);
			Session.set("successMessage", true);
		}
		else {
			Session.set("showMessage", true);
			Session.set("successMessage", false);
		}
	},
	'click .quiz-choice': function(event) {
		
		$(".quiz-choice").removeClass('user-choice');

		event.currentTarget.classList.add('user-choice');	
	}
});

