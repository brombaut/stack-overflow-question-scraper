import axios from 'axios';

const cheerio = require('cheerio');

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://stackoverflow.com/';
const newestTaggedAndroidFiler = 'questions/tagged/android?sort=Newest&edited=true';
const mostVotedAndroidFilter = 'questions/tagged/android?sort=MostVotes&edited=true';
const pageSizeFilter = '&pagesize=5';

function scrapeGenericQuestionSummaryList(html) {
    const $ = buildHtmlTree(html);
    const questionSummaries = $('#questions > .question-summary');
    const allQuestimSummaries = [];
    questionSummaries.each(function() {
        const title = $(this).find('.question-hyperlink').text();
        const hyperlink = $(this).find('.question-hyperlink').attr('href');
        const voteCount = Number($(this).find('.vote-count-post > strong').text());
        const answers = Number($(this).find('.unanswered > strong').text());
        const views = parseInt($(this).find('.views').text(), 10);
        const timeEl = $(this).find('.relativetime');
        const relativeTime = timeEl.text();
        const dateTimeString = timeEl.attr('title');

        allQuestimSummaries.push({
            title,
            hyperlink,
            voteCount,
            answers,
            views,
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
        const url = `${corsPrefix}${baseUrl}${newestTaggedAndroidFiler}`;
        axios.get(url).then(response => {
            if (response.status === 200) {
                const newestAndroidQuestionSummaries = scrapeGenericQuestionSummaryList(response.data);
                console.log('NEWEST');
                console.log(newestAndroidQuestionSummaries);
            }
        });
    },
    scrapeMostVotedAndroidQuestions() {
        const url = `${corsPrefix}${baseUrl}${mostVotedAndroidFilter}`;
        axios.get(url).then(response => {
            if (response.status === 200) {
                const mostVotedAndroidQuestionSummaries = scrapeGenericQuestionSummaryList(response.data);
                console.log('MOST VOTED');
                console.log(mostVotedAndroidQuestionSummaries);
            }
        });
    },
};
