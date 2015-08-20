Template.question.onCreated(function() {
	this.show = new ReactiveVar(0);
	this.success = new ReactiveVar(0);
});

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
		return Template.instance().show.get();
	},
	successMessage: function() {
		return Template.instance().success.get();
	},
	thisUserSolvedTheQuestion: function() {
		return QuestionsSolved.find({userId: Meteor.userId(), questionId: this.question._id}).count() !== 0;
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
			Template.instance().show.set(true);
			Template.instance().success.set(true);
		}
		else {
			Template.instance().show.set(true);
			Template.instance().success.set(false);
		}
	},
	'click .quiz-choice': function(event) {
		
		$(".quiz-choice").removeClass('user-choice');

		event.currentTarget.classList.add('user-choice');	
	},
	'click #next-question': function(event) {
		Template.instance().show.set(false);
		Template.instance().success.set(false);
	},
	'click #markItUnsolved': function(event) {
		var userId = Meteor.userId();
		var questionId = this.question._id;

		QuestionsSolved.remove({_id: QuestionsSolved.findOne({userId: userId,questionId: questionId})._id});
	
	},
	'click #markItSolved': function(event) {
		var userId = Meteor.userId();
		var questionId = this.question._id;

		QuestionsSolved.insert({
			userId: userId,
			questionId: questionId
		});
	}
});

