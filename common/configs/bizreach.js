import { DOM_ACTION, CLICK_ACTION } from './constants';

module.exports = {
    email: {
        jobIdRegex: /\d+/
    },
    login: {
        actions: {
            url: {
                type: 'url',
                path: 'https://cr-support.jp/login/'
            },
            username: {
                type: 'input_action',
                path: '//*[@name="mailAddress"]',
                value: 'hshiode@nature.global'
            },
            password: {
                type: 'input_action',
                path: '//*[@name="password"]',
                value: 'FashionConsultant1'
            },
            accept: {
                type: CLICK_ACTION,
                path: '//*[@class="btnAccept"]'
            }
        }
    },
    jobDetail: {
        url: 'https://cr-support.jp/mypage/',
        actions: {
            progressPage: {
                type: CLICK_ACTION,
                path: '//*[@id="jsi-gnav-progress"]'
            },
            resumeId: {
                type: 'input_action',
                path: '[@name="kw"]',
                value: ''
            },
            search: {
                type: CLICK_ACTION,
                path: '//input[contains(@value,"検索")]'
            },
            waitBody: {
                type: 'wait_action',
                path: '//*[@id="jsi_progress_tbody"]'
            },
            gotoCandidate: {
                type: CLICK_ACTION,
                path: '//*[@id="jsi_progress_tbody"]/tr[1]'
            },
            waitPage: {
                typ: 'wait_action',
                path: '//*[@id="jsi_resume_page_inner"]'
            },
            gotoResume: {
                type: CLICK_ACTION,
                path: '//a[contains(text(),"職務経歴書 - 和文")]'
            },
            waitResume: {
                type: 'wait_action',
                path: '//*[@id="jsi_resume_detail"]'
            },
            getResume: {
                type: 'html_action',
                path: '//*[@id="jsi_resume_page_inner"]'
            }
        },
        getProfile: {
            fields: {
                last_name: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_lap_left'
                },
                sex: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl > tbody > tr[1] > td[5]'
                },
                residence: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl > tbody > tr[1] > td[6]'
                },
                memo: {
                    type: 'empty_action',
                    path: ''
                },
                email: {
                    type: DOM_ACTION,
                    path: '#jsi_candidate_email_address'
                },
                first_name: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_lap_left'
                },
                phone: {
                    type: DOM_ACTION,
                    path: '#jsi_candidate_phone_number'
                },
                birthday_date: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl > tbody > tr[1] > td[4]'
                },
                birthday_year_old: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl > tbody > tr[1] > td[4]'
                }
            }
        },
        getBasicInformation: {
            fields: {
                last_login_date: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl pl5 fgGray > .fl ml20'
                },
                experience_overseas_work: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[6] > td[2]'
                },
                current_annual_income: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl > tbody > tr[1] > td[7]'
                },
                last_update_date: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_page_inner > .fl pl5 fgGray > .fl ml20'
                },
                experience_studying_abroad: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[6] > td[1]'
                },
                toeic_score: {
                    type: DOM_ACTION,
                    path: ''
                },
                number_of_management: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[3] > td[2]'
                },
                language: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[3] > td[1]'
                }
            }
        },
        getEducations: {
            fields: {
                school_name: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[2] > td[1]'
                },
                undergraduate_department_major: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[2] > td[1]'
                },
                graduation_date: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .tblCol2 wf > tbody > tr[2] > td[1]'
                }
            }
        },
        getDesiredCondition: {
            fields: {
                working_style_interested: {
                    type: DOM_ACTION,
                    path: '#jsi_resume_ja_block > .mt10 > .tblCol2 wf tlf > tbody > tr[5] > td[1]'
                },
                conditions_other:{
                    type: DOM_ACTION,
                    path:'#jsi_resume_ja_block > .mt10 > .tblCol2 wf tlf > tbody > tr[6] > td[1]'
                },
                overseas_preferred_location:{
                    type: DOM_ACTION,
                    path:'#jsi_resume_ja_block > .mt10 > .tblCol2 wf tlf > tbody > tr[4] > td[1] > .tblClear > tbody > .desiredLocation > p[4]'
                }
            }
        }
    }
};