'use strict';
/**
 * Module exports.
 * @public
 */

const got = require('got');
const cheerio = require('cheerio');
const cookie = require('cookie');
var setCookie = require('set-cookie-parser');
const URL = require('url');

exports.getMediaLink = getMediaLink;

/**
 * Get the media link (video url and thumb url) of the given google drive document id. 
 * @param {string} docId 
 * @returns 
 */
async function getMediaLink(docId) {
    try {
        var reqThumbnail = got.get('https://drive.google.com/thumbnail?sz=w320&id=' + docId, {
            followRedirect: false
        }).catch((x) => {
            return null;
        });
        var reqMedia = await got.get('https://drive.google.com/uc?id=' + docId + '&export=download', {
            followRedirect: false
        }).catch((x) => {
            // if(x.statusCode && x.statusCode===404) return createFailedResponse(2, 'No resource found');
            // return createFailedResponse(100, 'Unknown error');
            return createFailedResponse(x.statusCode, x.message);
        });
        if (reqMedia.statusCode === 200) {
            //we got something to work on.
        }
        else if (reqMedia.statusCode === 302) {
            var u = URL.parse(reqMedia.headers.location);
            if (u.hostname.endsWith('googleusercontent.com')) {
                return createSuccessResponse(reqMedia.headers.location, null);
            }
            else {
                //redirect occurs, possibly media not shared.
                return createFailedResponse(401, 'Unauthorized');
            }
        }
        else {
            return reqMedia;
        }
        var responseCookies = setCookie.parse(reqMedia.headers["set-cookie"]);
        var nextRequestCookies = responseCookies
            .filter((x) => x.domain === '.drive.google.com')
            .map((x) => {
                return cookie.serialize(x.name, x.value);
            }).join(';');

        var $ = cheerio.load(reqMedia.body);
        var downloadLink = $('#uc-download-link').attr('href');
        var reqMediaConfirm = await got.get('https://drive.google.com' + downloadLink, {
            headers: {
                cookie: nextRequestCookies
            }, followRedirect: false
        });
        var videoSource = reqMediaConfirm.headers.location;
        var thumbResponse = await reqThumbnail;
        var thumbSource = (thumbResponse && thumbResponse.headers && thumbResponse.headers.location) || '';
        return createSuccessResponse(videoSource, thumbSource);
    } catch (error) {
        throw ('Error while fetching the media link.' + error);
    }
}

function createFailedResponse(status, error) {
    return {
        satusCode: status,
        error: error
    }
}

function createSuccessResponse(videoSource, thumbSource) {
    return {
        src: videoSource,
        thumbnail: thumbSource
    };
}