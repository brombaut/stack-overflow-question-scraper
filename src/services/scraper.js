import axios from 'axios';

const cheerio = require('cheerio');

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://stackoverflow.com';

// eslint-disable-next-line max-len
const testData = '[{"id":59805884,"title":" onActivityResult not getting called from adpater        ","relativeHyperlink":"/questions/59805884/onactivityresult-not-getting-called-from-adpater?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805884/onactivityresult-not-getting-called-from-adpater?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"5 mins ago","dateTimeString":"2020-01-18 23:45:04Z","status":"unanswered","tagsArray":["java","android"]},{"id":59805855,"title":" Implementing Accelerometer in Android App        ","relativeHyperlink":"/questions/59805855/implementing-accelerometer-in-android-app?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805855/implementing-accelerometer-in-android-app?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"10 mins ago","dateTimeString":"2020-01-18 23:39:46Z","status":"unanswered","tagsArray":["android","apk","accelerometer","sensor"]},{"id":59805854,"title":" Can I make my android phone automatically factory reset if the pin is entered incorrectly to…        ","relativeHyperlink":"/questions/59805854/can-i-make-my-android-phone-automatically-factory-reset-if-the-pin-is-entered-in?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805854/can-i-make-my-android-phone-automatically-factory-reset-if-the-pin-is-entered-in?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"10 mins ago","dateTimeString":"2020-01-18 23:39:46Z","status":"unanswered","tagsArray":["android","security","mobile","customization"]},{"id":59805779,"title":" How can I code Google Nearby Search in JAVA?        ","relativeHyperlink":"/questions/59805779/how-can-i-code-google-nearby-search-in-java?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805779/how-can-i-code-google-nearby-search-in-java?r=SearchResults","voteCount":-1,"answers":0,"relativeTime":"24 mins ago","dateTimeString":"2020-01-18 23:26:10Z","status":"unanswered","tagsArray":["java","android","api","google-maps","android-studio"]},{"id":59805549,"title":" Android: Keep fragment running in the background        ","relativeHyperlink":"/questions/59805549/android-keep-fragment-running-in-the-background?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805549/android-keep-fragment-running-in-the-background?r=SearchResults","voteCount":1,"answers":2,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 22:43:43Z","status":"answered","tagsArray":["java","android","android-fragments"]},{"id":59805513,"title":" Android - Simplify ViewModel classes        ","relativeHyperlink":"/questions/59805513/android-simplify-viewmodel-classes?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805513/android-simplify-viewmodel-classes?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 22:37:14Z","status":"unanswered","tagsArray":["java","android","mvvm","android-architecture-components"]},{"id":59805432,"title":" AndroidViewModel vs passing Application context to ViewModel        ","relativeHyperlink":"/questions/59805432/androidviewmodel-vs-passing-application-context-to-viewmodel?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805432/androidviewmodel-vs-passing-application-context-to-viewmodel?r=SearchResults","voteCount":0,"answers":3,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 22:24:22Z","status":"answered","tagsArray":["android","android-architecture-components"]},{"id":59805391,"title":" using firebase in buildAPKs in Termux        ","relativeHyperlink":"/questions/59805391/using-firebase-in-buildapks-in-termux?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805391/using-firebase-in-buildapks-in-termux?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 22:16:32Z","status":"unanswered","tagsArray":["java","android","firebase","termux"]},{"id":59805314,"title":" How to detect changes on removable storage in Android?        ","relativeHyperlink":"/questions/59805314/how-to-detect-changes-on-removable-storage-in-android?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805314/how-to-detect-changes-on-removable-storage-in-android?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 22:05:14Z","status":"unanswered","tagsArray":["android","last-modified","fileobserver"]},{"id":59805270,"title":" How do you delete app passwords on an Android device?        ","relativeHyperlink":"/questions/59805270/how-do-you-delete-app-passwords-on-an-android-device?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805270/how-do-you-delete-app-passwords-on-an-android-device?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:58:16Z","status":"unanswered","tagsArray":["android","security","passwords"]},{"id":59805260,"title":" Image Processing App android java - ML API side        ","relativeHyperlink":"/questions/59805260/image-processing-app-android-java-ml-api-side?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805260/image-processing-app-android-java-ml-api-side?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:56:34Z","status":"unanswered","tagsArray":["java","android","api","tensorflow"]},{"id":59805247,"title":" Getting no data from the LiveData observer of a database        ","relativeHyperlink":"/questions/59805247/getting-no-data-from-the-livedata-observer-of-a-database?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805247/getting-no-data-from-the-livedata-observer-of-a-database?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:54:05Z","status":"unanswered","tagsArray":["java","android","database","observable","android-room"]},{"id":59805231,"title":" Invalid Credentials response even if correct JSON JAVA Volley        ","relativeHyperlink":"/questions/59805231/invalid-credentials-response-even-if-correct-json-java-volley?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805231/invalid-credentials-response-even-if-correct-json-java-volley?r=SearchResults","voteCount":2,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:51:22Z","status":"unanswered","tagsArray":["java","php","android"]},{"id":59805087,"title":" Is it safe to use apostrophe within my Android app name?        ","relativeHyperlink":"/questions/59805087/is-it-safe-to-use-apostrophe-within-my-android-app-name?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805087/is-it-safe-to-use-apostrophe-within-my-android-app-name?r=SearchResults","voteCount":0,"answers":2,"relativeTime":"2 hours ago","dateTimeString":"2020-01-18 21:34:54Z","status":"answered","tagsArray":["android","xml"]},{"id":59805019,"title":" how to convert string into Json and extrat from it info        ","relativeHyperlink":"/questions/59805019/how-to-convert-string-into-json-and-extrat-from-it-info?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805019/how-to-convert-string-into-json-and-extrat-from-it-info?r=SearchResults","voteCount":0,"answers":1,"relativeTime":"2 hours ago","dateTimeString":"2020-01-18 21:27:22Z","status":"answered-accepted","tagsArray":["java","android","json"]}]';

function scrapeGenericQuestionSummaryFromQueryHtml(html) {
    const $ = buildHtmlTree(html);
    const questionSummaries = $('.js-search-results .question-summary');
    const allQuestimSummaries = [];
    questionSummaries.each(function() {
        const title = $(this).find('.question-hyperlink').text().substring(3);
        const relativeHyperlink = $(this).find('.question-hyperlink').attr('href');
        const absoluteHyperlink = `${baseUrl}${relativeHyperlink}`;
        const id = Number(relativeHyperlink.split('/')[2]);
        const voteCount = Number($(this).find('.vote-count-post > strong').text());
        const answers = Number($(this).find('.status > strong').text());
        const statusClasses = $(this).find('.status').attr('class').split(' ');
        const [first, status] = statusClasses;
        const timeEl = $(this).find('.relativetime');
        const relativeTime = timeEl.text();
        const dateTimeString = timeEl.attr('title');
        const tagEls = $(this).find('.tags').children();
        const tagsArray = [];
        tagEls.each(function() {
            tagsArray.push($(this).text());
        });

        allQuestimSummaries.push({
            id,
            title,
            relativeHyperlink,
            absoluteHyperlink,
            voteCount,
            answers,
            relativeTime,
            dateTimeString,
            status,
            tagsArray,
        });
    });
    return allQuestimSummaries;
}

function scrapeGenericQuestionDetailsFromQuestionHtml(html) {
    const $ = buildHtmlTree(html);
    const headerEl = $('#question-header');
    const fullTitle = $(headerEl).find('.question-hyperlink').text();
    const questionEl = $('.question');
    const postTextEl = $(questionEl).find('.post-text');
    const questionBodyRawText = $(postTextEl).text();
    const questionBodyRawHtml = $(postTextEl).html();
    return {
        fullTitle,
        questionBodyRawText,
        questionBodyRawHtml,
    };
}

function buildHtmlTree(htmlString) {
    return cheerio.load(htmlString);
}

function buildFilterQuery(tab, tag, daysRange, pageSize) {
    return `/search?tab=${tab}&pagesize=${pageSize}&q=%5b${tag}%5d%20is%3aquestion%20created%3a${daysRange}d..`;
}

export default {
    scrapeStackOverflowSummaryQuestions(tab, tag, daysRange, pageSize) {
        const filterQuery = buildFilterQuery(tab, tag, daysRange, pageSize);
        const url = `${corsPrefix}${baseUrl}${filterQuery}`;
        // TODO: Remove this
        // if (true) {
        //     const promise = new Promise((resolve, reject) => resolve(JSON.parse(testData)));
        //     return promise.then(data => data);
        // }
        return axios.get(url).then(response => {
            if (response.status === 200) {
                const questionSummaries = scrapeGenericQuestionSummaryFromQueryHtml(response.data);
                return questionSummaries;
            }
            console.error(response);
            throw new Error({
                code: response.status,
                message: 'Could not retrieve data from Stack Overflow',
            });
        });
    },
    scrapeStackOverflowQuestionDetails(absoluteUrl) {
        const url = `${corsPrefix}${absoluteUrl}`;
        return axios.get(url).then(response => {
            if (response.status === 200) {
                const questionDetails = scrapeGenericQuestionDetailsFromQuestionHtml(response.data);
                return questionDetails;
            }
            console.error(response);
            throw new Error({
                code: response.status,
                message: 'Could not retrieve data from Stack Overflow',
            });
        });
    },
};
