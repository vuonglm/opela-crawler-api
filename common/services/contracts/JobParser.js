export default class JobParser {
	async login(username, password) {
		throw new Error(__('err.crawler.implementRequired', {method: 'login'}));
	}

	async getJobById(jobId) {
		throw new Error(__('err.crawler.implementRequired', {method: 'getJobById'}));
	}

	async getJobList(page = 1) {
		throw new Error(__('err.crawler.implementRequired', {method: 'getJobList'}));
	}
}
