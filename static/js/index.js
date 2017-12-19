var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var articleTitle = document.getElementById("article-title");
var websiteTitle = document.getElementById("website-title");
var publisher = document.getElementById("publisher");
var dayCreated = document.getElementById("day-created");
var monthCreated = document.getElementById("month-created");
var yearCreated = document.getElementById("year-created");
var dayAccessed = document.getElementById("day-accessed");
var monthAccessed = document.getElementById("month-accessed");
var yearAccessed = document.getElementById("year-accessed");


var urlToPass = document.getElementById("url-home");
var authorFull = "";

var isbnToPass = document.getElementById("isbn-home");
var bookTitle = document.getElementById("book-title");
var bookPublisher = document.getElementById("book-publisher");
var yearBookPublished = document.getElementById("year-book-published");

//Splits the author's first and last name
function firstLast(){
	var authorFirst = authorFull.split(' ').slice(0, -1).join(' ');
	var authorLast = authorFull.split(' ').slice(-1).join(' ');
	
	firstName.value = authorFirst.charAt(0).toUpperCase() + authorFirst.slice(1).toLowerCase();
	lastName.value = authorLast.charAt(0).toUpperCase() + authorLast.slice(1).toLowerCase();
}


function pushURL(){
	console.log("in pushURL");
	$.ajax({
		url: "/website",
		type: 'POST',
		contenttype: 'application/json; charset=utf-8',
		data : {"url" : urlToPass.value},
		dataType: 'JSON',
		success: function(response){
			publisher.value = response.publisher;
			authorFull = response.author;
			articleTitle.value = response.title;
			websiteTitle.value = response.websiteTitle;
			dayCreated.value = response.day;
			monthCreated.value = response.month;
			yearCreated.value = response.year;
			firstLast();
			fixMonthCreated();
			whichFormat();
		}
	});
}

function whichFormat(){
	var formatList = document.getElementById("format-list");
	var formatChoice = formatList.options[formatList.selectedIndex].value;
	
	if (formatList.value == "MLA"){
		citationMLA();
	}
	else if (formatList.value == "Chicago"){
		assembleFullCMS();
	}
	else if (formatList.value == "APA"){
		assembleAPACitation();
	}
	else{
		document.getElementById("citation-landing").innerHTML = "Please choose a valid format!";
		return;
	}
}

function fixMonthCreated(){
	var theMonth2 = "";
	//switch for month created
	switch(monthCreated.value){
		case "01":
			theMonth2 = "Jan";
			monthCreated.value = theMonth2;
			break;
		case "02":
			theMonth2 = "Feb";
			monthCreated.value = theMonth2;
			break;
		case "03":
			theMonth2 = "Mar";
			monthCreated.value = theMonth2;
			break;
		case "04":
			theMonth2 = "Apr";
			monthCreated.value = theMonth2;
			break;
		case "05":
			theMonth2 = "May";
			monthCreated.value = theMonth2;
			break;
		case "06":
			theMonth2 = "June";
			monthCreated.value = theMonth2;
			break;
		case "07":
			theMonth2 = "July";
			monthCreated.value = theMonth2;
			break;
		case "08":
			theMonth2 = "Aug";
			monthCreated.value = theMonth2;
			break;
		case "09":
			theMonth2 = "Sept";
			monthCreated.value = theMonth2;
			break;
		case "10":
			theMonth2 = "Oct";
			monthCreated.value = theMonth2;
			break;
		case "11":
			theMonth2 = "Nov";
			monthCreated.value = theMonth2;
			break;
		case "12":
			theMonth2 = "Dec";
			monthCreated.value = theMonth2;
	}
}

//-----------------------------------------------------------------

//This will automatically fill the date accessed input with the current date/month/year
var d = new Date();
var theMonth = "";
var monthNum = d.getMonth();
var theDay = d.getDate();
var theYear = d.getFullYear();

switch(monthNum){
	case 0:
		theMonth = "Jan";
		break;
	case 1:
		theMonth = "Feb";
		break;
	case 2:
		theMonth = "Mar";
		break;
	case 3:
		theMonth = "Apr";
		break;
	case 4:
		theMonth = "May";
		break;
	case 5:
		theMonth = "June";
		break;
	case 6:
		theMonth = "July";
		break;
	case 7:
		theMonth = "Aug";
		break;
	case 8:
		theMonth = "Sept";
		break;
	case 9:
		theMonth = "Oct";
		break;
	case 10:
		theMonth = "Nov";
		break;
	case 11:
		theMonth = "Dec";
}

//this will format the month the article was made into proper MLA abbreviation

//monthMade will hold the properly formatted month
var monthMade;

function formatMonthMade(){
	var validMonth = false;
	switch (monthCreated.value.toLowerCase()){
		case "january":
		case "jan":
			monthMade = "Jan";
			validMonth = true;
			break;

		case "february":
		case "feb":
			monthMade = "Feb";
			validMonth= true;
			break;

		case "march":
		case "mar":
			monthMade = "Mar";
			validMonth = true;
			break;

		case "april":
		case "apr":
			monthMade = "Apr";
			validMonth = true;
			break;

		case "may":
			monthMade = "May";
			validMonth = true;
			break;

		case "june":
			monthMade = "June";
			validMonth = true;
			break;

		case "july":
		case "jul":
			monthMade = "July";
			validMonth = true;
			break;

		case "august":
		case "aug":
			monthMade = "Aug";
			validMonth = true;
			break;

		case "september":
		case "sept":
			monthMade = "Sept";
			validMonth = true;
			break;

		case "october":
		case "oct":
			monthMade = "Oct";
			validMonth = true;
			break;

		case "november":
		case "nov":
			monthMade = "Nov";
			validMonth = true;
			break;

		case "december":
		case "dec":
			monthMade = "Dec";
			validMonth = true;
			break;
		}
	if (monthCreated.value === "" || validMonth === false){
		monthMade="";
		console.log("Invalid input for the month under the \"Date Created\" section.");
	}
}


//Orders the name into Lastname, Firstname and capitalizes first leter of each name
function assembleAuthorMLA(){
	if (firstName.value != "" && lastName.value != ""){
		authorAssembled = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase() + ", " + firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". ";
	}
	else if (firstName.value != "" && lastName.value === ""){
		authorAssembled = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". "
		console.log('hello')
		
	}
	else if (firstName.value === "" && lastName.value != ""){
		authorAssembled = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase() + ". "
	}
	else {
		authorAssembled = "";
	}
}

//Formats the title to be capitalized
function assembleTitle(){
	if (articleTitle.value != ""){
			articleAssembled = "\"" + articleTitle.value.charAt(0).toUpperCase() + articleTitle.value.slice(1) + ".\" ";
	}
	else{
		articleAssembled = "";
	}
}

//Formats publisher to be capitalized. If there is no publisher, "N.p." is substituted
function assemblePublisher(){
	if (publisher.value != ""){
		publisherAssembled = publisher.value.charAt(0).toUpperCase() + publisher.value.slice(1) + ", "
	}
	else{
		publisherAssembled="N.p., ";
	}
}

//Formats website title to be capitalized
function assembleWebsiteTitle(){
	if (websiteTitle.value != ""){
		websiteTitleTemp = websiteTitle.value.charAt(0).toUpperCase() + websiteTitle.value.slice(1) + ", ";
		websiteTitleAssembled = websiteTitleTemp.italics();
	}
	else{
		websiteTitleAssembled = "";
	}
}

//Formats the date the article was created. If no month is inputted, the day will not be included
function assembleDateCreated(){
	assemblePublisher();
	formatMonthMade();
	
	if (yearCreated.value===""){
		dateCreatedAssembled="n.d. ";
	}
	else if(monthMade==="" && yearCreated.value != ""){
		dateCreatedAssembled= yearCreated.value + ". ";
	}
	else {
		dateCreatedAssembled= dayCreated.value + " " + monthMade + " " + yearCreated.value + ". ";
	}
}

//Formats the automatically generated date accessed into MLA format
function assembleDateAccessed(){
	dateAccessedAssembled = dayAccessed.value + " " + monthAccessed.value + " " + yearAccessed.value + ". ";
}

//Redundant for now, allows for future expansion into other media
function whichMedium(){
	medium = "web";
	if (medium === "web"){
		mediumInput = "Web. "
	}
}

//Main function that assembles the independent variables into a cohesive citation
function citationMLA() {
	
	assembleAuthorMLA();
	assembleTitle();
	assembleWebsiteTitle();
	assembleDateCreated();
	assembleDateAccessed();
	whichMedium();

	document.getElementById("citation-landing").innerHTML = authorAssembled + articleAssembled + websiteTitleAssembled + publisherAssembled + dateCreatedAssembled +  mediumInput + dateAccessedAssembled;
		
}

//inserts todays date into the Date Accessed field
document.getElementById("month-accessed").value = theMonth;
document.getElementById("day-accessed").value = theDay;
document.getElementById("year-accessed").value = theYear;

//------------------------------Chicago------------------------------------//
function correctMonthFootnoteCMS(){
	switch(monthCreated.value.toLowerCase()){
		case "01":
		case "jan":
		case "january":
			monthFootnoteCMS = "January";
			break;

		case "02":
		case "feb":
		case "february":
			monthFootnoteCMS = "February";
			break;

		case "03":
		case "mar":
		case "march":
			monthFootnoteCMS = "March";
			break;

		case "04":
		case "april":
			monthFootnoteCMS = "April";
			break;

		case "05":
		case "may":
			monthFootnoteCMS = "May";
			break;

		case "06":
		case "june":
			monthFootnoteCMS = "June";
			break;

		case "07":
		case "july":
			monthFootnoteCMS = "July";
			break;

		case "08":
		case "aug":
		case "august":
			monthFootnoteCMS = "August";
			break;

		case "09":
		case "sep":
		case "sept":
		case "september":
			monthFootnoteCMS = "September";
			break;

		case "10":
		case "oct":
		case "october":
			monthFootnoteCMS = "October";
			break;

		case "11":
		case "nov":
		case "november":
			monthFootnoteCMS = "November";
			break;

		case "12":
		case "dec":
		case "december":
			monthFootnoteCMS = "December";
			break;
	}
	return monthFootnoteCMS;
}

function assembleAuthorFootnoteCMS(){
	if (firstName.value != "" && lastName.value != ""){
		authorAssembledFootnoteCMS = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + " " + lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1) + ", ";
	}

	else if (firstName.value == "" && lastName.value != ""){
		authorAssembledFootnoteCMS = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1) + ", ";
	}

	else if (lastName.value == ""){
		authorAssembledFootnoteCMS = "";
	}
	return authorAssembledFootnoteCMS;
}

function assembleTitleFootnoteCMS(){
	if (articleTitle != ""){
		articleTitleAssembledFootnoteCMS = "\"" + articleTitle.value.charAt(0).toUpperCase() + articleTitle.value.slice(1) + ",\" ";
	}
	if (articleTitle.value == ""){
		articleTitleAssembledFootnoteCMS = "";
	}
	return articleTitleAssembledFootnoteCMS;
}

function assemblePublisherFootnoteCMS(){
	if (publisher.value != ""){
		publisherAssembledFootnoteCMS = publisher.value.charAt(0).toUpperCase().italics() + publisher.value.slice(1).italics() + ", ";
	}
	else if (websiteTitle.value != ""){
		publisherAssembledFootnoteCMS = websiteTitle.value.charAt(0).toUpperCase().italics() + websiteTitle.value.slice(1).italics() + ", ";
	}
	else{
		publisherAssembledFootnoteCMS = "";
	}
	return publisherAssembledFootnoteCMS;
}

function assembleDateFootnoteCMS(){
	if (websiteTitle.value == "" && publisher.value == ""){
		if (dayCreated.value != "" && monthCreated.value != "" && yearCreated.value != ""){
			dateAssembledFootnoteCMS = "Last modified " + correctMonthFootnoteCMS() + " " + dayCreated.value + ", " + yearCreated.value;
		}
		if (dayCreated.value == "" && monthCreated.value != "" && yearCreated.value != ""){
				dateAssembledFootnoteCMS = "Last modified " + monthCreated.value + ", " + yearCreated.value;
		}
		if (monthCreated.value == "" && yearCreated.value != ""){
			dateAssembledFootnoteCMS = "Last modified " + yearCreated.value;
		}
    }
    if (websiteTitle.value != "" || publisher.value != ""){
		if (dayCreated.value != "" && monthCreated.value != "" && yearCreated.value != ""){
			dateAssembledFootnoteCMS = "last modified " + correctMonthFootnoteCMS() + " " + dayCreated.value + ", " + yearCreated.value;
		}
		if (dayCreated.value == "" && monthCreated.value != "" && yearCreated.value != ""){
				dateAssembledFootnoteCMS = "last modified " + monthCreated.value + ", " + yearCreated.value;
		}
		if (monthCreated.value == "" && yearCreated.value != ""){
			dateAssembledFootnoteCMS = "last modified " + yearCreated.value;
		}
    }
	if (yearCreated.value == ""){
		if (websiteTitle.value == "" && publisher.value == ""){
		dateAssembledFootnoteCMS = "Accessed " + monthAccessed.value + " " + dayAccessed.value + ", " + yearAccessed.value;
			}
		else{
		dateAssembledFootnoteCMS = "accessed " + monthAccessed.value + " " + dayAccessed.value + ", " + yearAccessed.value;

		}
	}
	return dateAssembledFootnoteCMS;
}

function urlInsertFootnote(){
	if (urlToPass.value != ""){
		urlAssembled = ", " + urlToPass.value + "."
	}
	else{
		urlAssembled = "."
	}
	return urlAssembled;
}

function urlInsertCitation(){
	if (urlToPass.value != ""){
		urlAssembled = ". " + urlToPass.value + "."
	}
	else{
		urlAssembled = "."
	}
	return urlAssembled;
}

function assembleFootnoteCMS(){
	footnoteCMS = "FOOTNOTE: " + assembleAuthorFootnoteCMS() + assembleTitleFootnoteCMS() + assemblePublisherFootnoteCMS() + assembleDateFootnoteCMS() + urlInsertFootnote();
	//document.getElementById("citation-landing").innerHTML = "FOOTNOTE: " + footnoteCMS;
	return footnoteCMS;
}

function assembleAuthorCitationCMS(){
	if (firstName.value != "" && lastName.value != ""){
		authorAssembledCitationCMS = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1) + ", " + firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". ";
	}

	if (firstName.value == "" && lastName.value != ""){
		authorAssembledCitationCMS = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1)  + ". ";
	}

	if (firstName.value == "" && lastName.value == ""){
		authorAssembledCitationCMS = "";
	}

	if (firstName.value != "" && lastName.value == ""){
		authorAssembledCitationCMS = "";
	}

	return authorAssembledCitationCMS;
}

function assembleTitleCitationCMS(){
	if (articleTitle != ""){
		articleTitleAssembledFootnoteCMS = "\"" + articleTitle.value.charAt(0).toUpperCase() + articleTitle.value.slice(1) + ".\" ";
	}
	if (articleTitle.value == ""){
		articleTitleAssembledFootnoteCMS = "";
	}
	return articleTitleAssembledFootnoteCMS;
}

function assemblePublisherCitationCMS(){
	if (publisher.value != ""){
		publisherAssembledCitationCMS = publisher.value.charAt(0).toUpperCase().italics() + publisher.value.slice(1).italics() + ", ";
	}
	else if (websiteTitle.value != ""){
		publisherAssembledCitationCMS = websiteTitle.value.charAt(0).toUpperCase().italics() + websiteTitle.value.slice(1).italics() + ", ";
	}
	else{
		publisherAssembledCitationCMS = "";
	}
	return publisherAssembledCitationCMS;
}

function assembleDateCitationCMS(){
	if (websiteTitle.value == "" && publisher.value == ""){
		if (dayCreated.value != "" && monthCreated.value != "" && yearCreated.value != ""){
			dateAssembledCitationCMS = "Last modified " + correctMonthFootnoteCMS() + " " + dayCreated.value + ", " + yearCreated.value;
		}
		if (dayCreated.value == "" && monthCreated.value != "" && yearCreated.value != ""){
				dateAssembledCitationCMS = "Last modified " + monthCreated.value + ", " + yearCreated.value;
		}
		if (monthCreated.value == "" && yearCreated.value != ""){
			dateAssembledCitationCMS = "Last modified " + yearCreated.value;
		}
    }
    if (websiteTitle.value != "" || publisher.value != ""){
		if (dayCreated.value != "" && monthCreated.value != "" && yearCreated.value != ""){
			dateAssembledCitationCMS = "last modified " + correctMonthFootnoteCMS() + " " + dayCreated.value + ", " + yearCreated.value;
		}
		if (dayCreated.value == "" && monthCreated.value != "" && yearCreated.value != ""){
				dateAssembledCitationCMS = "last modified " + monthCreated.value + ", " + yearCreated.value;
		}
		if (monthCreated.value == "" && yearCreated.value != ""){
			dateAssembledCitationCMS = "last modified " + yearCreated.value;
		}
    }
	if (yearCreated.value == ""){
		if (websiteTitle.value == "" && publisher.value == ""){
		dateAssembledCitationCMS = "Accessed " + monthAccessed.value + " " + dayAccessed.value + ", " + yearAccessed.value;
			}
		else{
		dateAssembledCitationCMS = "accessed " + monthAccessed.value + " " + dayAccessed.value + ", " + yearAccessed.value;

		}
	}
	return dateAssembledCitationCMS;
}

function assembleCitationCMS(){
	citationCMS = "\n" + "CITATION: " + assembleAuthorCitationCMS() + assembleTitleCitationCMS() + assemblePublisherCitationCMS() + assembleDateCitationCMS() + urlInsertCitation();
	//document.getElementById("citation-landing").innerHTML = "CITATION: " + citationCMS;
	return citationCMS;
}

function assembleFullCMS(){
	document.getElementById("citation-landing").innerHTML = assembleFootnoteCMS();
	document.getElementById("citation-landing2").innerHTML = assembleCitationCMS();
	document.getElementById("citation-break").style.display = "inline-block";
	fullChicagoCitation = assembleFootnoteCMS() + "\n" + assembleCitationCMS();
	document.getElementById("citation-landing").innerHTML = fullChicagoCitation;

	return fullChicagoCitation;; 
}



//--------------------------------APA----------------------------------//

function assembleAuthorAPA(){
	if (firstName.value != "" && lastName.value != ""){
		authorAssembledAPA = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase() + ", " + firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". ";
	}
	else if (firstName.value != "" && lastName.value === ""){
		authorAssembledAPA = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". "
		//console.log('hello')
		
	}
	else if (firstName.value === "" && lastName.value != ""){
		authorAssembledAPA = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase() + ". "
	}
	else {
		authorAssembledAPA = "";
	}
	return authorAssembledAPA
}

function assembleTitleAPA(){
	if (articleTitle != ""){
		articleTitleAssembledAPA = articleTitle.value.charAt(0).toUpperCase() + articleTitle.value.slice(1) + ". ";
	}
	if (articleTitle.value == ""){
		articleTitleAssembledAPA = "";
	}
	return articleTitleAssembledAPA;
}

function assemblePublisherAPA(){
	if (publisher.value != ""){
		publisherAssembledAPA = publisher.value.charAt(0).toUpperCase().italics() + publisher.value.slice(1).italics() + ". ";
	}
	else if (websiteTitle.value != ""){
		publisherAssembledAPA = websiteTitle.value.charAt(0).toUpperCase().italics() + websiteTitle.value.slice(1).italics() + ". ";
	}
	else{
		publisherAssembledAPA = "";
	}
	return publisherAssembledAPA;
}

function assembleDateAPA(){
	if (yearCreated.value != ""){
			dateAssembledAPA = "(" + yearCreated.value + "). "
	}
	else{
		dateAssembledAPA = "n.d."
	}
	return dateAssembledAPA;
}

function urlInsertAPACitation(){
	if (urlToPass.value != ""){
		urlAssembled = "Retrieved from " + urlToPass.value + "."
	}
	else{
		urlAssembled = "."
	}
	return urlAssembled;
}

function assembleAPACitation(){
	APACitation = assembleAuthorAPA() + assembleDateAPA() + assembleTitleAPA() + assemblePublisherAPA() + urlInsertAPACitation();
	document.getElementById("citation-landing").innerHTML = APACitation;
	return APACitation;
}