import Browser from 'puppeteer';
import async from 'async';
import _ from 'lodash';

describe('Try to login GREEN', () => {
	const LOGIN_URL = 'https://www.green-japan.com/client/login';
	const username = 'C0006328';
	const password = 'q8op8i99hk7o';
	let browser;
	it('Login using browser', (done) => {
		const login = (next) => {
			( async () => {
				const page = await browser.newPage();
				await page.goto(LOGIN_URL, { waitUntil: 'networkidle2'});
				const usernameInput = await page.$('#client_cd');
				await usernameInput.type(username);
				const passwordInput = await page.$('#client_password');
				await passwordInput.type(password);
				const button = await page.$('#btn_login');
				await button.click();
				await page.waitForNavigation();
				next(null, page);
			})();
		};

		const verifyLogin = (page, next) => {
			( async () => {
				const html = await page.content();
				console.log(html);
				next();
			})();
		};

		async.waterfall([
			login,
			verifyLogin
		], (err, result) => {
			done();
		});
	});

	before( done => {
		( async () => {
			browser = await Browser.launch({
				headless: false
			});
			done();
		})();
	});

	after(done => {
		(async () => {
			browser.close();
			done();
		}) ();
	});
});
