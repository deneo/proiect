Template.lesson.helpers({
	'starsFulls': function() {
		var starsFulls = []
		for (var i = 1; i <= this.lesson.dificulty; ++i)
			starsFulls.push('');
		return starsFulls;

	},
	'starsEmpty': function() {
		var starsEmpty = [];
		for (var i = 1; i <= 5 - this.lesson.dificulty; ++i)
			starsEmpty.push('');
		return starsEmpty;
	}
});