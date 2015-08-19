breadcrumb = function(path) {
	var re = /\/([\w\s]+)/g;
	var rez;
	var solution = [];

	do {
		var rez = re.exec(path);
		if (rez)
			if (solution.length == 0)
				solution.push({link: "/continut" + rez[0], name: rez[1]});
			else
				solution.push({link: solution[solution.length - 1].link + rez[0], name: rez[1]});
	} while(rez);
	console.log(solution);

	return solution;
}