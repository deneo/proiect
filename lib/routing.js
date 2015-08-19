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
	data: function() {
		var currentPath = this.params.route;
		var regex = '^/' + currentPath + '$';
		var navigationPath = breadcrumb('/' + currentPath);
		console.log('/' + currentPath);
		return {navigationPath: navigationPath, 
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
	data: function() {
		var currentPath = this.params.route;
		var re = /\/(\w+)$/;
		var rez = re.exec(currentPath);
		var navigationPath = breadcrumb('/' + currentPath);
		navigationPath[navigationPath.length - 1].link = navigationPath[navigationPath.length - 1].link.replace("/continut", "/lectie");
		
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
		var re = /\/(\w+)$/;
		var rez = re.exec(currentPath);
		var navigationPath = breadcrumb('/' + currentPath);
		navigationPath[navigationPath.length - 1].link = navigationPath[navigationPath.length - 1].link.replace("/continut", "/intrebare");
		currentPath = currentPath.replace(rez[0], '');
		var regex = '^/' + currentPath + '$';

		Session.set("currentQuestion", rez[1]);
		return {navigationPath: navigationPath, question: Questions.findOne({_id: rez[1]})};
	}
});

