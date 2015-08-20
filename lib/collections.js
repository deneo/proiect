Schemas = {};

Categories = new Meteor.Collection('categories');
Lessons = new Meteor.Collection('lessons');
Questions = new Meteor.Collection('questions');
QuestionsSolved = new Meteor.Collection('questionsSolved');

Schemas.Categories = new SimpleSchema({
	_id: {
		type: String,
		max: 100
	},
	path: {
		type: String
	}
});

Schemas.Lessons = new SimpleSchema({
	_id: {
		type: String,
		max: 100
	},

	path: {
		type: String
	},

	dificulty: {
		type: Number
	},

	html: {
		type: String,
		autoform: {
     		rows: 10
    	}
	}
});

Schemas.Questions = new SimpleSchema({
	path: {
		type: String
	},
	question: {
		type: String
	},
	answers: {
		type: [String]
	},
	correctAnswer: {
		type: Number
	},
	dificulty: {
		type: Number
	}

});

Schemas.QuestionsSolved = new SimpleSchema({
	userId: {
		type: String
	},
	questionId: {
		type: String
	}

});

Categories.attachSchema(Schemas.Categories);
Lessons.attachSchema(Schemas.Lessons);
Questions.attachSchema(Schemas.Questions);
QuestionsSolved.attachSchema(Schemas.QuestionsSolved);
