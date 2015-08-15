Schemas = {};

Categories = new Meteor.Collection('categories');
Lessons = new Meteor.Collection('lessons');
Posts = new Meteor.Collection('posts');

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

	html: {
		type: String,
		autoform: {
     		rows: 10
    	}
	}
})

Categories.attachSchema(Schemas.Categories);
Lessons.attachSchema(Schemas.Lessons);
