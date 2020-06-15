import { DOM_ACTION, CLICK_ACTION } from './constants';

module.exports = {
	email: {
		jobIdRegex: /\d+/
	},
	login: {
		actions: {
			url: {
				type: 'url',
				path: 'https://www.green-japan.com/client/login'
			},
			username: {
				type: 'input_action',
				path: '//*[@id="client_cd"]',
				value: 'C0006328'
			},
			password: {
				type: 'input_action',
				path: '//*[@id="client_password"]',
				value: 'q8op8i99hk7o'
			},
			accept: {
				type: CLICK_ACTION,
				path: '//*[@id="btn_login"]'
			}
		}
	},
	jobDetail: {
		url: 'https://www.green-japan.com/client/top',
		actions: {
			userPage: {
				type: CLICK_ACTION,
				path: '//span[text()="アプローチ管理"]//parent::a'
			},
			waitList: {
				type: 'wait_action',
				path: '//*[@id="js-user-list"]'
			},
			sleep: {
				type: 'sleep_action',
				value: '2'
			},
			findResume: {
				type: 'loop_action',
				path: {
					list: '//*[@class="js-apply-list"]',
					item: './/td[2]/span[4]'
				}
			},
			waitTab: {
				type: 'wait_action',
				path: '//li[@id="js-tab-resume"]'
			},
			gotoResume: {
				type: CLICK_ACTION,
				path: '//li[@id="js-tab-resume"]'
			},
			waitArea: {
				type: 'wait_action',
				path: '//*[@id="js-resume-scroll-area"]'
			},
			getResume: {
				type: 'html_action',
				path: '//*[@id="js-resume-scroll-area"]'
			}
		},
		getProfile: {
			fields: {
				first_name:{
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-left > .noborder zebra > tbody > tr[1] > td[1]'
				},
				last_name: {
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-left > .noborder zebra > tbody > tr[2] > td[1]'
				},
				sex: {
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-left > .noborder zebra > tbody > tr[3] > td[1]'
				},
				residence: {
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-left > .noborder zebra > tbody > tr[5] > td[1]'
				},
				memo: {
					type: 'empty_action',
					path: ''
				},
				email: {
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-left > .noborder zebra > tbody > tr[5] > td[1]'
				},
				phone:{
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-left > .noborder zebra > tbody > tr[6] > td[1]'
				}
			}
		},
		getBasicInformation: {
			fields: {
				current_annual_income: {
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-right > .noborder zebra > tbody > tr[1] > td[1]'
				},
				language: {
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-right > .noborder zebra > tbody > tr[3] > td[1]'
				},
				toeic_score:{
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-right > .noborder zebra > tbody > tr[3] > td[1]'
				},
				qualification:{
					type: DOM_ACTION,
					path: '#js-resume-scroll-area > .resume-right > .noborder zebra > tbody > tr[4] > td[1]'
				}
			}
		}
	},
	jobListing: {
		fields: {

		}
	}
};
