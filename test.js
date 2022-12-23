const test = require('ava');
const gdDirectUrl = require('./index');

const sampleGoogleDocId = '1oFPTnnjP-Yhw7xFt5kCH49VH8PLyN297';

test('Should return valid response', async t => {
    const result = await gdDirectUrl.getMediaLink(sampleGoogleDocId);
    result.src ? t.pass() : t.fail();
});
