import axios from 'axios';

const cheerio = require('cheerio');

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://stackoverflow.com';

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
