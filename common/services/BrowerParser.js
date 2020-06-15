import JobParser from './contracts/JobParser';

export default class BrowserParser extends JobParser {
	constructor(page) {
		this.page = page;
		this.pageNumber = 1;
	}

	async login(username, password) {

	}

	async getJobById() {

	}

	async getJobList() {

	}
}
