import axios from 'axios';

const cheerio = require('cheerio');

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://stackoverflow.com';
const newestFilterString = '/search?tab=newest&q=%5bandroid%5d%20is%3aquestion%20created%3a7d..';
const mostVotesFilterString = '/search?tab=votes&q=%5bandroid%5d%20is%3aquestion%20created%3a7d..';

// eslint-disable-next-line max-len
const testData = '[{"id":59805549,"title":" Android: Keep fragment running in the background        ","relativeHyperlink":"/questions/59805549/android-keep-fragment-running-in-the-background?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805549/android-keep-fragment-running-in-the-background?r=SearchResults","voteCount":0,"answers":2,"relativeTime":"22 mins ago","dateTimeString":"2020-01-18 22:43:43Z","status":"answered"},{"id":59805513,"title":" Android - Simplify ViewModel classes        ","relativeHyperlink":"/questions/59805513/android-simplify-viewmodel-classes?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805513/android-simplify-viewmodel-classes?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"28 mins ago","dateTimeString":"2020-01-18 22:37:14Z","status":"unanswered"},{"id":59805432,"title":" AndroidViewModel vs passing Application context to ViewModel        ","relativeHyperlink":"/questions/59805432/androidviewmodel-vs-passing-application-context-to-viewmodel?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805432/androidviewmodel-vs-passing-application-context-to-viewmodel?r=SearchResults","voteCount":0,"answers":3,"relativeTime":"41 mins ago","dateTimeString":"2020-01-18 22:24:22Z","status":"answered"},{"id":59805391,"title":" using firebase in buildAPKs in Termux        ","relativeHyperlink":"/questions/59805391/using-firebase-in-buildapks-in-termux?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805391/using-firebase-in-buildapks-in-termux?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"49 mins ago","dateTimeString":"2020-01-18 22:16:32Z","status":"unanswered"},{"id":59805314,"title":" How to detect changes on removable storage in Android?        ","relativeHyperlink":"/questions/59805314/how-to-detect-changes-on-removable-storage-in-android?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805314/how-to-detect-changes-on-removable-storage-in-android?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 22:05:14Z","status":"unanswered"},{"id":59805270,"title":" How do you delete app passwords on an Android device?        ","relativeHyperlink":"/questions/59805270/how-do-you-delete-app-passwords-on-an-android-device?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805270/how-do-you-delete-app-passwords-on-an-android-device?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:58:16Z","status":"unanswered"},{"id":59805260,"title":" Image Processing App android java - ML API side        ","relativeHyperlink":"/questions/59805260/image-processing-app-android-java-ml-api-side?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805260/image-processing-app-android-java-ml-api-side?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:56:34Z","status":"unanswered"},{"id":59805247,"title":" Getting no data from the LiveData observer of a database        ","relativeHyperlink":"/questions/59805247/getting-no-data-from-the-livedata-observer-of-a-database?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805247/getting-no-data-from-the-livedata-observer-of-a-database?r=SearchResults","voteCount":0,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:54:05Z","status":"unanswered"},{"id":59805231,"title":" Invalid Credentials response even if correct JSON JAVA Volley        ","relativeHyperlink":"/questions/59805231/invalid-credentials-response-even-if-correct-json-java-volley?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805231/invalid-credentials-response-even-if-correct-json-java-volley?r=SearchResults","voteCount":2,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:51:22Z","status":"unanswered"},{"id":59805087,"title":" Is it safe to use apostrophe within my Android app name?        ","relativeHyperlink":"/questions/59805087/is-it-safe-to-use-apostrophe-within-my-android-app-name?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805087/is-it-safe-to-use-apostrophe-within-my-android-app-name?r=SearchResults","voteCount":0,"answers":2,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:34:54Z","status":"answered"},{"id":59805019,"title":" how to convert string into Json and extrat from it info        ","relativeHyperlink":"/questions/59805019/how-to-convert-string-into-json-and-extrat-from-it-info?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59805019/how-to-convert-string-into-json-and-extrat-from-it-info?r=SearchResults","voteCount":0,"answers":1,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:27:22Z","status":"answered-accepted"},{"id":59804988,"title":" What is the Maximum Size of an Application(APK) to Download and Install Without WiFi in Play…        ","relativeHyperlink":"/questions/59804988/what-is-the-maximum-size-of-an-applicationapk-to-download-and-install-without?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59804988/what-is-the-maximum-size-of-an-applicationapk-to-download-and-install-without?r=SearchResults","voteCount":1,"answers":1,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:24:35Z","status":"answered"},{"id":59804984,"title":" Constraint Layout height takes available space        ","relativeHyperlink":"/questions/59804984/constraint-layout-height-takes-available-space?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59804984/constraint-layout-height-takes-available-space?r=SearchResults","voteCount":1,"answers":2,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:23:41Z","status":"answered"},{"id":59804962,"title":" Null reference in Context OkHTTP        ","relativeHyperlink":"/questions/59804962/null-reference-in-context-okhttp?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59804962/null-reference-in-context-okhttp?r=SearchResults","voteCount":-2,"answers":0,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:20:56Z","status":"unanswered"},{"id":59804957,"title":" Android Q . FileChooser SecurityException        ","relativeHyperlink":"/questions/59804957/android-q-filechooser-securityexception?r=SearchResults","absoluteHyperlink":"https://stackoverflow.com/questions/59804957/android-q-filechooser-securityexception?r=SearchResults","voteCount":1,"answers":1,"relativeTime":"1 hour ago","dateTimeString":"2020-01-18 21:20:34Z","status":"answered"}]';

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
        });
    });
    return allQuestimSummaries;
}

function buildHtmlTree(htmlString) {
    return cheerio.load(htmlString);
}

function buildFilterQuery(tab, tag, daysRange) {
    return `/search?tab=${tab}&q=%5b${tag}%5d%20is%3aquestion%20created%3a${daysRange}d..`;
}

export default {
    scrapeStackOverflowSummaryQuestions(tab, tag, daysRange) {
        const filterQuery = buildFilterQuery(tab, tag, daysRange);
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
};
