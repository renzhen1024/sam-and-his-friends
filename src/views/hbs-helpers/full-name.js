const hbs = require('hbs');

hbs.registerHelper('fullName', (firstName, lastName) => {
	return `${lastName} ${firstName}`;
});
