(function(t){function e(e){for(var a,r,o=e[0],l=e[1],c=e[2],d=0,f=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(a=!1)}a&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},i={app:0},s=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/stack-overflow-question-scraper/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0524":function(t,e,n){"use strict";var a=n("6ddc"),i=n.n(a);i.a},"095f":function(t,e,n){"use strict";var a=n("a1de"),i=n.n(a);i.a},1:function(t,e){},"13e8":function(t,e,n){},2:function(t,e){},3:function(t,e){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.screenIsTooSmall,expression:"screenIsTooSmall"}],attrs:{id:"mobile-coming-soon"}},[t._v("\n      Mobile version not available\n  ")]),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.screenIsTooSmall,expression:"!screenIsTooSmall"}],attrs:{id:"desktop-wrapper"}},[n("MainHeader",{attrs:{isRefreshing:t.isRefreshing,filterType:t.filterTypes[t.filterType],filterDateRange:t.filterDateRange,filterTags:t.filterTags,filterPageSize:t.filterPageSize},on:{refresh:t.handleRefreshEvent,changeFilterType:t.handleFilterTypeChange,changeFilterDateRange:t.handleFilterDateRangeChange,changeFilterPageSize:t.handleFilterPageSizeChange,updateTempTags:t.handleUpdateTempTags}}),n("main",[n("section",[n("h2",[t._v(t._s(t.filterTypes[t.filterType])+" Questions")]),t.questionSummaries.length>0?n("SummaryTable",{attrs:{title:t.filterType,rows:t.questionSummaries,filterTags:t.filterTags},on:{tagClicked:t.updateFilterTags,rowClicked:t.handleQuestionSelected}}):n("h3",[t._v("No Data Found")])],1)]),n("QuestionDetailsModal",{attrs:{show:t.showModal,questionSummaryDetails:t.selectedQuestionSummaryDetails,questionBodyDetails:t.selectedQuestionBodyDetails,filterTags:t.filterTags},on:{modalClosed:t.resetSelectedQuestion,tagClicked:t.updateFilterTags}})],1)])},s=[],r=(n("8e6e"),n("ac6a"),n("456d"),n("75fc")),o=n("bd86"),l=(n("7514"),n("768b")),c=(n("28a5"),n("c5f6"),n("bc3a")),u=n.n(c),d=n("02cc"),f="https://cors-anywhere.herokuapp.com/",h="https://stackoverflow.com";function p(t){var e=v(t),n=e(".js-search-results .question-summary"),a=[];return n.each((function(){var t=e(this).find(".question-hyperlink").text().substring(3),n=e(this).find(".question-hyperlink").attr("href"),i="".concat(h).concat(n),s=Number(n.split("/")[2]),r=Number(e(this).find(".vote-count-post > strong").text()),o=Number(e(this).find(".status > strong").text()),c=e(this).find(".status").attr("class").split(" "),u=Object(l["a"])(c,2),d=(u[0],u[1]),f=e(this).find(".relativetime"),p=f.text(),g=f.attr("title"),v=e(this).find(".tags").children(),m=[];v.each((function(){m.push(e(this).text())})),a.push({id:s,title:t,relativeHyperlink:n,absoluteHyperlink:i,voteCount:r,answers:o,relativeTime:p,dateTimeString:g,status:d,tagsArray:m})})),a}function g(t){var e=v(t),n=e("#question-header"),a=e(n).find(".question-hyperlink").text(),i=e(".question"),s=e(i).find(".post-text"),r=e(s).text(),o=e(s).html();return{fullTitle:a,questionBodyRawText:r,questionBodyRawHtml:o}}function v(t){return d.load(t)}function m(t,e,n,a){for(var i="",s=0;s<e.length;++s)i+="[".concat(e[s],"]");return"/search?tab=".concat(t,"&pagesize=").concat(a,"&q=").concat(i," is:question created:").concat(n,"d..")}var w={scrapeStackOverflowSummaryQuestions:function(t,e,n,a){var i=m(t,e,n,a),s="".concat(f).concat(h).concat(i);return u.a.get(s).then((function(t){if(200===t.status){var e=p(t.data);return e}throw console.error(t),new Error({code:t.status,message:"Could not retrieve data from Stack Overflow"})}))},scrapeStackOverflowQuestionDetails:function(t){var e="".concat(f).concat(t);return u.a.get(e).then((function(t){if(200===t.status){var e=g(t.data);return e}throw console.error(t),new Error({code:t.status,message:"Could not retrieve data from Stack Overflow"})}))}},y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",{staticClass:"summary-table"},[t._m(0),a("tbody",t._l(t.rows,(function(e){return a("tr",{key:e.id,on:{click:function(n){return t.handleRowClick(e)}}},[a("td",[t._v(t._s(e.id))]),a("td",[a("b",[t._v(t._s(e.title))])]),a("td",[t._v(t._s(e.relativeTime))]),a("td",[t._v(t._s(e.voteCount))]),a("td",[t._v(t._s(e.answers))]),a("td",{class:{answered:t.isAnswered(e.status),accepted:t.isAccepted(e.status)}},[t._v("\n                "+t._s(t.formatStatusString(e.status))+"\n            ")]),a("td",{staticClass:"tags-column"},t._l(e.tagsArray,(function(n){return a("div",{key:e.id+"-"+n,class:{tag:!0,"current-tag":t.filterTags.includes(n)},attrs:{"data-tag-value":n},on:{click:function(e){return e.stopPropagation(),t.handleTagClick(e)}}},[t._v("\n                    "+t._s(n)+"\n                ")])})),0),a("td",[a("div",{staticClass:"so-link-container"},[a("a",{attrs:{href:e.absoluteHyperlink,target:"_blank"},on:{click:function(t){t.stopPropagation()}}},[a("img",{staticClass:"so-link-image",attrs:{src:n("70a4")}})])])])])})),0)])},S=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("ID")]),n("th",[t._v("Title")]),n("th",[t._v("Posted")]),n("th",[t._v("Votes")]),n("th",[t._v("Answers")]),n("th",[t._v("Status")]),n("th",[t._v("Tags")]),n("th")])])}],T=(n("6762"),n("2fdb"),n("a481"),{props:{title:String,rows:Array,filterTags:Array},methods:{formatStatusString:function(t){var e=t.split("-"),n="";return e.forEach((function(t){n+="".concat(t.replace(/^\w/,(function(t){return t.toUpperCase()}))," & ")})),n.substring(0,n.length-3)},isAnswered:function(t){return t.includes("answered")&&!t.includes("unanswered")},isAccepted:function(t){return t.includes("accepted")},handleTagClick:function(t){var e=t.target.dataset.tagValue,n=[e];this.$emit("tagClicked",n)},handleRowClick:function(t){this.$emit("rowClicked",t.id)}}}),b=T,D=(n("095f"),n("2877")),_=Object(D["a"])(b,y,S,!1,null,null,null),k=_.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[a("img",{staticClass:"scraper-logo",attrs:{src:n("cf35")}}),a("h3",[t._v("Stack Overflow Question Scraper")]),a("div",{staticClass:"expand"}),a("div",{staticClass:"actions-container"},[a("DropdownElement",{attrs:{dropdownTitle:t.filterTypeDrowdownTitle,dropdownOptions:t.filterTypeDrowdownOptions,dropdownSelectCallback:t.handleFilterTypeDropdownSelection}}),a("DropdownElement",{attrs:{dropdownTitle:t.filterDateSelectorString,dropdownOptions:t.filterDateDrowdownOptions,dropdownSelectCallback:t.handleFilterDateRangeDropdownSelection}}),a("DropdownElement",{attrs:{dropdownTitle:t.filterPageSizeSelectorString,dropdownOptions:t.filterPageSizeDrowdownOptions,dropdownSelectCallback:t.handlePageSizeDropdownSelection}}),a("TagsFilter",{attrs:{tags:t.filterTags},on:{updateTempTags:t.handleUpdateTempTags}}),a("RefreshButton",{attrs:{clickCallback:t.handleRefreshClick,isRefreshing:t.isRefreshing}})],1)])},O=[],R=(n("4917"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown"},[n("button",{staticClass:"dropbtn border-left"},[t._v(t._s(t.dropdownTitle))]),n("div",{staticClass:"dropdown-content"},t._l(t.dropdownOptions,(function(e){return n("span",{key:e.value,attrs:{"data-value":e.value,"data-title":e.title},on:{click:t.dropdownSelectCallback}},[t._v("\n              "+t._s(e.title)+"\n          ")])})),0)])}),q=[],P={props:{dropdownTitle:String,dropdownSelectCallback:Function,dropdownOptions:Array}},j=P,x=(n("9753"),Object(D["a"])(j,R,q,!1,null,null,null)),A=x.exports,Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"border-left",attrs:{id:"refresh"},on:{click:t.clickCallback}},[t.isRefreshing?n("div",{staticClass:"lds-dual-ring"}):n("span",[t._v("Refresh")])])},F=[],z={props:{clickCallback:Function,isRefreshing:Boolean}},E=z,M=(n("5a27"),Object(D["a"])(E,Q,F,!1,null,null,null)),$=M.exports,I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"action",attrs:{id:"tag-filter-container"}},[n("span",{staticClass:"tag-container"},[t._v("\n          Tag: \n          "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.tagsString,expression:"tagsString"}],attrs:{id:"filter-tag-input",type:"text",placeholder:"Enter a tag..."},domProps:{value:t.tagsString},on:{keyup:t.handleTagsInputUpdated,input:function(e){e.target.composing||(t.tagsString=e.target.value)}}})]),t._m(0)])},B=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tag-error-content"},[n("p",{staticClass:"tag-error-message"},[n("b",[t._v("Invalid Tag String; ")]),t._v("Only alphanumeric characters and '.', '#', '+' and '-' characters are allowed. Separate tags with spaces.\n          ")])])}],N={props:{tags:Array,refreshCallback:Function},data:function(){return{tagsString:""}},computed:{stringOfTags:function(){for(var t="",e=0;e<this.tags.length;++e)t+="".concat(this.tags[e],", ");return t}},methods:{createTagsString:function(){this.tagsString="";for(var t=0;t<this.tags.length;++t)this.tagsString+="".concat(this.tags[t]," ");this.tagsString=this.tagsString.substring(0,this.tagsString.length-1)},handleTagsInputUpdated:function(){var t=this.tagsString.trim().split(" ");this.$emit("updateTempTags",t)}},watch:{tags:function(){this.createTagsString()}},mounted:function(){this.createTagsString()}},V=N,L=(n("fcc7"),Object(D["a"])(V,I,B,!1,null,"649c067a",null)),H=L.exports,U={components:{DropdownElement:A,RefreshButton:$,TagsFilter:H},data:function(){return{tagsAreValid:!0}},props:{isRefreshing:Boolean,filterType:String,filterDateRange:Number,filterTags:Array,filterPageSize:Number},computed:{filterTypeDrowdownTitle:function(){return"Filter By: ".concat(this.filterType)},filterTypeDrowdownOptions:function(){return[{value:"newest",title:"Newest"},{value:"votes",title:"Most Votes"},{value:"relevance",title:"Relevance"},{value:"active",title:"Active"}]},filterDateSelectorString:function(){return"Search Period: ".concat(this.filterDateRange," ").concat(1===this.filterDateRange?"Day":"Days")},filterDateDrowdownOptions:function(){return[{value:"1",title:"1 Day"},{value:"7",title:"7 Days"},{value:"15",title:"15 Days"},{value:"30",title:"30 Days"}]},filterPageSizeSelectorString:function(){return"Query Size: ".concat(this.filterPageSize," Rows")},filterPageSizeDrowdownOptions:function(){return[{value:"10",title:"10 Rows"},{value:"15",title:"15 Rows"},{value:"30",title:"30 Rows"},{value:"50",title:"50 Rows"}]}},methods:{handleRefreshClick:function(){this.tagsAreValid?(document.querySelector("#tag-filter-container").classList.remove("tag-error"),this.$emit("refresh")):document.querySelector("#tag-filter-container").classList.add("tag-error")},handleFilterTypeDropdownSelection:function(t){var e=t.target.dataset.value;this.$emit("changeFilterType",e)},handleFilterDateRangeDropdownSelection:function(t){var e=Number(t.target.dataset.value);this.$emit("changeFilterDateRange",e)},handlePageSizeDropdownSelection:function(t){var e=Number(t.target.dataset.value);this.$emit("changeFilterPageSize",e)},validateTag:function(t){if(0===t.length)return!0;var e=t.match(/^[0-9a-z+\-.#]+$/);return e},handleUpdateTempTags:function(t){for(var e=!0,n=0;n<t.length;++n)e=e&&this.validateTag(t[n]);e?(this.$emit("updateTempTags",t),this.tagsAreValid=!0):this.tagsAreValid=!1}}},W=U,J=(n("d63c"),Object(D["a"])(W,C,O,!1,null,null,null)),G=J.exports,K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:{modal:!0,"modal-show":t.isVisible,"modal-hide":!t.isVisible},attrs:{id:"modal-wrapper"},on:{click:function(e){return e.target!==e.currentTarget?null:t.closeModal(e)}}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[t.detailsAreLoaded?a("h4",[t._v(t._s(t.questionBodyDetails.fullTitle))]):a("h4",[t._v(t._s(t.questionSummaryDetails.title))]),a("div",{staticClass:"expand"}),a("div",{staticClass:"actions-container"},[a("div",{staticClass:"so-link-container action"},[a("a",{attrs:{href:t.questionSummaryDetails.absoluteHyperlink,target:"_blank"}},[a("img",{staticClass:"so-link-image",attrs:{src:n("70a4")}})])]),a("span",{staticClass:"close action",on:{click:t.closeModal}},[t._v("\n                    ×\n                ")])])]),a("div",{staticClass:"modal-body"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.detailsAreLoaded,expression:"detailsAreLoaded"}],staticClass:"question-body-container"},[a("div",{attrs:{id:"question-body-question-container"}}),a("div",{attrs:{id:"question-body-tags-contaer"}},t._l(t.questionSummaryDetails.tagsArray,(function(e){return a("div",{key:e,class:{"current-tag":t.filterTags.includes(e)},attrs:{"data-tag-value":e},on:{click:function(e){return e.stopPropagation(),t.handleTagClick(e)}}},[t._v("\n                        "+t._s(e)+"\n                    ")])})),0)]),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.detailsAreLoaded,expression:"!detailsAreLoaded"}],staticClass:"lds-dual-ring"})]),a("div",{staticClass:"modal-footer"},[a("div",{staticClass:"stat-container"},[a("span",[t._v("Posted: "+t._s(t.questionSummaryDetails.relativeTime))])]),a("div",{staticClass:"stat-container"},[a("span",[t._v("Votes: "+t._s(t.questionSummaryDetails.voteCount))])]),a("div",{staticClass:"stat-container"},[a("span",[t._v("Answers: "+t._s(t.questionSummaryDetails.answers))])]),a("div",{class:{"stat-container":!0,answered:t.isAnswered(t.questionSummaryDetails.status),accepted:t.isAccepted(t.questionSummaryDetails.status)}},[a("span",[t._v("Status: "+t._s(t.formatStatusString(t.questionSummaryDetails.status)))])])])])])},X=[],Y={props:{show:Boolean,questionSummaryDetails:Object,questionBodyDetails:Object,filterTags:Array},data:function(){return{isVisible:!1}},computed:{detailsAreLoaded:function(){return this.questionBodyDetails&&Object.keys(this.questionBodyDetails).length>0}},methods:{closeModal:function(){this.isVisible=!1,this.$emit("modalClosed")},formatStatusString:function(t){if(!t)return"";var e=t.split("-"),n="";return e.forEach((function(t){n+="".concat(t.replace(/^\w/,(function(t){return t.toUpperCase()}))," & ")})),n.substring(0,n.length-3)},isAnswered:function(t){return t&&t.includes("answered")&&!t.includes("unanswered")},isAccepted:function(t){return t&&t.includes("accepted")},handleTagClick:function(t){var e=t.target.dataset.tagValue,n=[e];this.$emit("tagClicked",n),this.closeModal()}},watch:{show:function(t){this.isVisible=t},detailsAreLoaded:function(t){var e=document.querySelector("#question-body-question-container");e.innerHTML=t?this.questionBodyDetails.questionBodyRawHtml:""}},mounted:function(){var t=this;document.addEventListener("keyup",(function(e){"Escape"===e.code&&t.closeModal()}))},beforeDestroy:function(){this.closeModal()}},Z=Y,tt=(n("0524"),Object(D["a"])(Z,K,X,!1,null,null,null)),et=tt.exports;function nt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function at(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?nt(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):nt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var it={name:"app",components:{SummaryTable:k,MainHeader:G,QuestionDetailsModal:et},data:function(){return{screenIsTooSmall:!1,questionSummaries:[],specificQuestionDetails:{},isRefreshing:!1,filterTypes:{newest:"Newest",votes:"Most Votes",relevance:"Relevance",active:"Active"},filterType:"newest",filterDateRange:7,filterTags:["android"],filterPageSize:10,showModal:!1,selectedQuestionId:null,tempTags:["android"]}},computed:{selectedQuestionSummaryDetails:function(){var t=this;return this.selectedQuestionId?this.questionSummaries.find((function(e){return e.id===t.selectedQuestionId})):{}},selectedQuestionBodyDetails:function(){return this.selectedQuestionId?this.specificQuestionDetails[this.selectedQuestionId]:{}}},methods:{fetchData:function(){var t=this;this.isRefreshing=!0,w.scrapeStackOverflowSummaryQuestions(this.filterType,this.filterTags,this.filterDateRange,this.filterPageSize).then((function(e){t.questionSummaries=e.slice(0,t.filterPageSize+1),t.isRefreshing=!1})).catch((function(e){t.isRefreshing=!1}))},handleRefreshEvent:function(){this.isRefreshing||(this.useTempTags(),this.fetchData())},handleFilterTypeChange:function(t){this.filterType=t,this.fetchData()},handleFilterDateRangeChange:function(t){this.filterDateRange=t,this.fetchData()},handleFilterPageSizeChange:function(t){this.filterPageSize=t,this.fetchData()},updateFilterTags:function(t){this.handleUpdateTempTags(t),this.filterTags=t,this.fetchData()},handleQuestionSelected:function(t){var e=this;this.selectedQuestionId=t;var n=this.questionSummaries.find((function(e){return e.id===t}));if(!n.detailsFetched){var a=this.selectedQuestionSummaryDetails;a&&w.scrapeStackOverflowQuestionDetails(a.absoluteHyperlink).then((function(t){e.addQuestionDetails(t)}))}document.body.style.overflow="hidden",this.showModal=!0},addQuestionDetails:function(t){var e=at({},t);this.$set(this.specificQuestionDetails,"".concat(this.selectedQuestionId),e)},resetSelectedQuestion:function(){this.selectedQuestionId=null,document.body.style.overflow="auto",this.showModal=!1},handleUpdateTempTags:function(t){this.tempTags=t},useTempTags:function(){this.filterTags=Object(r["a"])(this.tempTags)},handleWindowResize:function(){this.screenIsTooSmall=window.innerWidth<880}},mounted:function(){this.fetchData(),this.handleWindowResize(),window.addEventListener("resize",this.handleWindowResize)}},st=it,rt=(n("5c0b"),Object(D["a"])(st,i,s,!1,null,null,null)),ot=rt.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(ot)}}).$mount("#app")},"5a27":function(t,e,n){"use strict";var a=n("f6c4"),i=n.n(a);i.a},"5c0b":function(t,e,n){"use strict";var a=n("e332"),i=n.n(a);i.a},"6ddc":function(t,e,n){},"6e23":function(t,e,n){},"70a4":function(t,e,n){t.exports=n.p+"img/so_logo.2d47e939.png"},9753:function(t,e,n){"use strict";var a=n("acd6"),i=n.n(a);i.a},a1de:function(t,e,n){},acd6:function(t,e,n){},cf35:function(t,e,n){t.exports=n.p+"img/scraper.7664dd57.png"},d63c:function(t,e,n){"use strict";var a=n("13e8"),i=n.n(a);i.a},e332:function(t,e,n){},f6c4:function(t,e,n){},fcc7:function(t,e,n){"use strict";var a=n("6e23"),i=n.n(a);i.a}});
//# sourceMappingURL=app.f52eda2e.js.map