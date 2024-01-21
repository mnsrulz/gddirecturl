'use strict';
/**
 * Module exports.
 * @public
 */

exports.getMediaLink = getMediaLink;

/**
 * Get the media link (video url and thumb url) of the given google drive document id. 
 * @param {string} docId 
 * @returns 
 */
async function getMediaLink(docId) {
    try {
        const reqThumbnail = fetch('https://drive.google.com/thumbnail?sz=w320&id=' + docId, {
            redirect: 'manual'
        }).catch((x) => {
            return null;
        });
        const directUrl = 'https://drive.usercontent.google.com/download?id=' + docId + '&export=download&confirm=1';
        const reqMedia = await fetch(directUrl, {
            method: 'head'
        }).catch(x => {
            return createFailedResponse(x.status, x.message);
        });
        if (reqMedia.ok) {
            const thumbResponse = await reqThumbnail;
            const thumbSource = (thumbResponse && thumbResponse.headers && thumbResponse.headers.get('location')) || '';
            return createSuccessResponse(directUrl, thumbSource);
        } else {
            return createFailedResponse(reqMedia.status, reqMedia.statusText);
        }
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