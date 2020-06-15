import _ from 'lodash';

const getDOMField = async (page, selector) => {
	if (typeof page.$ !== 'function') {
		throw new Error(__('err.crawler.invalidPageObject'));
		return;
	}
	let text;
	if (selector.startsWith("//")) {
		const fieldEl= page.$x(selector);
		text = page.evaluate( el => el.innerText, fieldEl[0]);
	} else {
		const fieldEl= page.$(selector);
		text = page.evaluate( el => el.innerText, fieldEl);
	}
	return text;
};

const getJSONField = async (jsonData, path) => {
	const val = _.get(jsonData, path);
	return val;
};

export { getDOMField, getJSONField };
