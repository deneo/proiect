Template.category.onCreated(function(){
	this.filterSolvedQuestions = new ReactiveVar(0);
});

Template.category.helpers({
	showThisQuestion: function() {
		if (Template.instance().filterSolvedQuestions.get() == false) return 1;
		return QuestionsSolved.find({userId: Meteor.userId(), questionId: this._id}).count() == 0;
	},
	viewAll: function() {
		return Template.instance().filterSolvedQuestions.get() == 0;
	}
})

Template.category.events({
	'click #filterSolvedQuestions': function() {
		Template.instance().filterSolvedQuestions.set(true);
	},
	'click #filterAllQuestions': function() {
		Template.instance().filterSolvedQuestions.set(false);
	}

});

