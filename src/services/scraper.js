import axios from 'axios';

const cheerio = require('cheerio');

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://stackoverflow.com/';
// const newestTaggedAndroidFiler = 'questions/tagged/android?sort=Newest&edited=true';
// const mostVotedAndroidFilter = 'questions/tagged/android?sort=MostVotes&edited=true';
// const pageSizeFilter = '&pagesize=5';

const newestFilterString = 'search?tab=newest&q=%5bandroid%5d%20is%3aquestion%20created%3a7d..';
const mostVotesFilterString = 'search?tab=votes&q=%5bandroid%5d%20is%3aquestion%20created%3a7d..';

function scrapeGenericQuestionSummaryFromQueryHtml(html) {
    const $ = buildHtmlTree(html);
    const questionSummaries = $('.js-search-results .question-summary');
    const allQuestimSummaries = [];
    questionSummaries.each(function() {
        const title = $(this).find('.question-hyperlink').text();
        const hyperlink = `${baseUrl}${$(this).find('.question-hyperlink').attr('href')}`;
        const id = Number(hyperlink.split('/')[2]);
        const voteCount = Number($(this).find('.vote-count-post > strong').text());
        const answers = Number($(this).find('.status > strong').text());
        const timeEl = $(this).find('.relativetime');
        const relativeTime = timeEl.text();
        const dateTimeString = timeEl.attr('title');

        allQuestimSummaries.push({
            id,
            title,
            hyperlink,
            voteCount,
            answers,
            relativeTime,
            dateTimeString,
        });
    });
    return allQuestimSummaries;
}

function buildHtmlTree(htmlString) {
    return cheerio.load(htmlString);
}

export default {
    scrapeNewestAndroidQuestions() {
        const url = `${corsPrefix}${baseUrl}${newestFilterString}`;
        return axios.get(url).then(response => {
            if (response.status === 200) {
                const newestAndroidQuestionSummaries = scrapeGenericQuestionSummaryFromQueryHtml(response.data);
                return newestAndroidQuestionSummaries;
            }
            console.error(response);
            return [];
        });
    },
    scrapeMostVotedAndroidQuestions() {
        const url = `${corsPrefix}${baseUrl}${mostVotesFilterString}`;
        return axios.get(url).then(response => {
            if (response.status === 200) {
                const mostVotedAndroidQuestionSummaries = scrapeGenericQuestionSummaryFromQueryHtml(response.data);
                return mostVotedAndroidQuestionSummaries;
            }
            console.error(response);
            return [];
        });
    },
};
