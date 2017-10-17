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
			citationMLA();
		}
	});
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