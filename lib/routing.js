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
		return {navigationPath: navigationPath, 
				category: Categories.find({path: {$regex: regex}}).fetch()
				};
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
		currentPath = currentPath.replace(rez[0], '');
		var regex = '^/' + currentPath + '$';
		return {navigationPath: navigationPath, data: Lessons.findOne({_id: rez[1], path: {$regex: regex}})};
	}
});

