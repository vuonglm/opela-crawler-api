import Browser from 'puppeteer'

describe('Try to login Biz Reach', () => {
    it('Login using browser', (done) => {
        (async()=>{
            console.log('it');
            done();
        })();
    });

    before(done => {
        (async () => {
            console.log('before');
            done();
        })();
    });

    after(done => {
        (async () => {
            console.log('after');
            done();
        })();
    });
})