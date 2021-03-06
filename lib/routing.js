Router.configure({
	layoutTemplate: 'ApplicationLayout',
	loadingTemplate: 'ApplicationLoading'
});

Router.route('/', function() {
	this.render('home');
});

Router.route('/continut/:route*', {
	name: 'category',
	template: 'category',
	onRun: function() {
		Session.set("lastRoute", Session.get("newRoute"));
    	Session.set("newRoute", this.params.route);
    	this.next();
	},
	data: function() {
		var currentPath = this.params.route;

		var re = /\/([\w\s]+)$/;
		var category = re.exec('/' + currentPath);
		category = category[1];
		category = category[0].toUpperCase() + category.slice(1);

		var regex = '^/' + currentPath + '$';
		var navigationPath = breadcrumb('/' + currentPath);

		return {
				currentCategory: category,
				navigationPath: navigationPath, 
				categories: Categories.find({path: {$regex: regex}}).fetch(),
				lessons: Lessons.find({path: {$regex: regex}}).fetch(),
				questions:  Questions.find({$or: [
							{path: {$regex: regex.replace("$", "\/")}},
							{path: {$regex: regex}}
							]}).fetch()
				}
	}
});

Router.route('/lectie/:route*', {
	name: 'lesson',
	template: 'lesson',
	onRun: function() {
		Session.set("lastRoute", Session.get("newRoute"));
    	Session.set("newRoute", this.params.route);
    	this.next();
	},
	data: function() {
		var currentPath = this.params.route;
		var re = /\/([\w\s]+)$/;
		var rez = re.exec(currentPath);
		var navigationPath = breadcrumb('/' + currentPath);
		
		var regex_lesson = '^/' + currentPath.replace(rez[0], '') + '$';
		var regex_questions = '^/' + currentPath + '$';

		return {navigationPath: navigationPath, 
			lesson: Lessons.findOne({_id: rez[1], path: {$regex: regex_lesson}}),
			questions: Questions.find({path: {$regex: regex_questions}}).fetch()};
	}
});

Router.route('/intrebare/:route*', {
	name: 'question',
	template: 'question',
	data: function() {
		var currentPath = this.params.route;
		var re = /\/([\w\s]+)$/;
		var rez = re.exec(currentPath);
		var navigationPath = breadcrumb('/' + currentPath);
		currentPath = currentPath.replace(rez[0], '');
		var regex = '^/' + currentPath + '$';

		Session.set("currentQuestion", rez[1]);
		return {navigationPath: navigationPath, question: Questions.findOne({_id: rez[1]})};
	}
	
});

