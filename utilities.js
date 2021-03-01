const fs = require('fs');

function injectContent(filepath, { header, body }) {
  const template = fs.readFileSync(filepath, 'utf8');
  return template
    .replace('{{body_content_do_not_remove}}', body)
    .replace('{{header_content_do_not_remove}}', header);
}

function formatDate(timestamp) {

	// Create a date object from the timestamp
	var date = new Date(timestamp);

	// Create a list of names for the months
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

	// return a formatted date
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

};

module.exports = { injectContent, formatDate };