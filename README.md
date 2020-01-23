# Stack Overflow Question Scraper
Deployed at https://brombaut.github.io/stack-overflow-question-scraper/

## Initial Problem Description
Suppose that I am interested in the area of Android development. I like to browse and answer Stack Overflow questions that are related to Android. However, it is tedious to search for the relevant questions on Stack Overflow. I would like to see the titles of the 10 newest Android-related questions and the 10 most voted Android-related questions posted in the past week, on one page. In this way I can easily keep track of the relevant questions. In addition, I would like to be able to read the full information of these questions in a convenient way.  

Requirements:
- Extracting from stackoverflow.com the 10 newest Android-related questions, as well as the 10 most voted Android-related questions that are created in the past week.

- Building a simple website that displays the titles of the extracted questions.

- Providing a convenient way of displaying the full question thread after I click on one of the titles.

- Adding a cool feature that you came up with yourself (please explain the feature in your documentation).

---

## Features
After building an application that would retrieve the 10 rewest and 10 most viewed android related questions, I decided to make the system much more flexible for the user in terms of what they are able to query. The features of the application are explained below.

### Querying and Viewing Stack Overflow Questions
Users are able to filter the results by:
- **Type** - Selecting an option from the dropdown will update the query and load the new results automatically.
    - Newest (Default)
    - Most Votes
    - Relevance
    - Active
- **Search Period** - Selecting an option from the dropdown will update the query and load the new results automatically.
    - Previous Day
    - Previous 7 Days (Default)
    - Previous 15 Days
    - Previous 30 Days
- **Query Size** - Selecting an option from the dropdown will update the query and load the new results automatically.
    - Return 10 Results (Default)
    - Return 15 Results
    - Return 30 Results
    - Return 50 Results
- **Question Tag** - Enter a new tag value and click the 'Refresh' button, or hit the 'Enter' key
    - Users can enter a tag into a search bar in order to only retrieve questions that have been tagged with that string (no tag is also accepted). Default value is '**android**'.

The information returned is displayed in a table. Each row contains the following information for a question:
- Stack Overflow question ID
- Question title
- When the question was posted
- Current vote count
- Number of answers
- Current status of the question (*Unanswered*, *Answered*, or *Answered & Accepted*)
- Tags of the question
- Link to open the question on Stack Overflow in a new tab

### Viewing Full Question Description
Clicking on one of the rows will open a modal that contains all the information listed above, as well as the full question description, including any images or code snippets included in the original question.

### Quick Tag Search
Clicking on any tag label, either in the 'Tags' column of the main table or on the Question Details modal, will automatically update the query to retrieve questions with the clicked tag. The currently selected tags are highlighted in bright blue, rather than the usual navy colour.

---

## Building & Running Locally
This project was built using the [Vue](https://vuejs.org/) framework. The [Vue CLI](https://cli.vuejs.org/) will be required to edit and run this project locally, as well as [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/get-npm) (Note that npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer). Once you clone this repository, `cd` into the root directory and run the following command:
```
npm install
```
This will install projects dependencies. One this is completed, you are able to run any of the following commands:

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
---

## Components
The main components of the application are descriped below, with any additional libraries they use.

### Scraper.js
This module is used to make requests to stack overflow based on query parameters it recieves from higher level modules, builds the HTML tree, extracts the relevant information, and returns it to the calling module. The requests are made to Stack Overflow using the [axios](https://github.com/axios/axios) library. Once the raw HTML document is retrieved, the tree is built and the data extracted using the [cheerio](https://cheerio.js.org/) library.

### App.vue
The root element of the application. All event that are emitted from child components are handled in this module. This is also the module that communicates with the scraper module, and passes any data recieved down to it's child components.

### MainHeader.vue
The main header. The options that are used to build the query for the scraper module are selected in this module. Hovering the cursor over the *Filter By*, *Search Period*, or *Query Size* labels will display a dropdown with the available options to select. Clicking one of these option will update the query and load the new results automatically. There is also a text input box that users can enter a tag value in to filter their results by. Once they enter a value, they must click the '**Refresh**' button to the right of the text input to update the query.

### SummaryTable.vue
The table that contains all the question summaries returned from the query. The table contains the following columns: Question ID; Question Title; Posted Date; Votes; Answers; Status; Tags; and Stack Overflow Question Link. Clicking the Stack Overflow Link icon will open the link in a new tab.

### QuestionDetailsModal.vue
The modal element. Once the question body is retrieved, it is rendered in this component. In addition to the question body, this component also displays all the data in one of the rows in the Summary Table compnent. Users can also open the Stack Overflow question link from the modal.

---

## Future Work
Below is a list of features/functionality that I think would be worth implementing in the future:
- Ability to export all extracted data to .json or .csv formats.
- Ability to filter on multiple tags.
- Ability to filter by text in the title of the question.
- Ability to filter by only questions, only answers, or both.
- More date range filters (e.g. hours, weeks, months, etc.)
- Better error handling - give user some feedback if, for example, a call to fetch the question body fails.
- Investigate the request limit imposed by Stack Overflow.
- Break up the Vue comonents to make them more modular, as they have gotten a bit large and are each handling a variety of functinality.
- Add tests. Lots of tests.
- This application was not built with mobile devices in mind - would be cool to get it working on any screen size.
- Add custom style classes to question body to display code tags and other elements like that better
