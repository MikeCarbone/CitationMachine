var isbnToPass = document.getElementById("isbn-home");
var bookTitle = document.getElementById("book-title");
var bookPublisher = document.getElementById("book-publisher");
var yearBookPublished = document.getElementById("year-book-published");
var firstName = document.getElementById("first-name");
var lastName = document.getElementById("last-name");
var edition = document.getElementById("edition");
var volume = document.getElementById("volume");
var chapterSection = document.getElementById("chapter");
var pageStart = document.getElementById("page-start");
var pageEnd = document.getElementById("page-end");
var series = document.getElementById("series-input");
var foundIsbn = "";
var bookCover = "";

function pushISBN(){
	console.log('function pushISBN called');

	$.ajax({
		isbn: "/",
		type: 'POST',
		contenttype: 'application/json; charset=utf-8',
		data : {"isbnSearch" : isbnToPass.value},
		dataType: 'JSON',
		success: function(response){

			console.log('Info sent. Retrieving data...');
	
			bookTitle.value = response.title;
			bookPublisher.value = response.publisher;
			yearBookPublished.value = response.year;
			foundIsbn = response.isbn;
			bookCover = response.coverURL;

			authorArray = response.author;
			tempHold = authorArray[0];
			console.log("response.author: ", authorArray);
			console.log("tempHold: ", tempHold);
			if (tempHold != undefined){
				tempHold.toString();
				authorFull = tempHold;}
			else{
				authorFull = "";
			}

			firstLast();
			citationBookMLA();
			assembleCover();
			
		}
	});
}

function firstLast(){
	var authorFirst = authorFull.split(' ').slice(0, -1).join(' ');
	var authorLast = authorFull.split(' ').slice(-1).join(' ');
	
	firstName.value = authorFirst.charAt(0).toUpperCase() + authorFirst.slice(1).toLowerCase();
	lastName.value = authorLast.charAt(0).toUpperCase() + authorLast.slice(1).toLowerCase();

	return(firstName, lastName);
}

function assembleAuthorMLA(){
	if (firstName.value != "" && lastName.value != ""){
		authorAssembled = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase() + ", " + firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". ";
	}

	else if (firstName.value != "" && lastName.value === ""){
		authorAssembled = firstName.value.charAt(0).toUpperCase() + firstName.value.slice(1) + ". "
	}

	else if (firstName.value === "" && lastName.value != ""){
		authorAssembled = lastName.value.charAt(0).toUpperCase() + lastName.value.slice(1).toLowerCase() + ". "
	}

	else {
		authorAssembled = "";
	}

	return(authorAssembled);
}

function assembleBookTitleMLA() {
	bookTitleAssembled = bookTitle.value.charAt(0).toUpperCase().italics() + bookTitle.value.slice(1).italics() + ". ";
	return(bookTitleAssembled);
}

function assembleBookPublisher(){
	if (bookPublisher.value != ""){
		prepublisherAssembled = bookPublisher.value.charAt(0).toUpperCase() + bookPublisher.value.slice(1);
	}
	else{
		prepublisherAssembled="N.p.";
	}

	if (yearBookPublished.value != ""){
		publisherAssembled = prepublisherAssembled + ', ';
	}
	else if (yearBookPublished.value == "" && bookPublisher.value == "" && pageStart == "" && pageEnd == ""){
		publisherAssembled = "N.p";
	}
	else {
		publisherAssembled = prepublisherAssembled;
	}
	return publisherAssembled;
}

function assembleEdition() {

	function ordinal_suffix_of(edition) {
	    var j = edition % 10,
	        k = edition % 100;
	    if (j == 1 && k != 11) {
	    	suffixEdition = edition + "st";
	        return suffixEdition
	    }
	    if (j == 2 && k != 12) {
	    	suffixEdition = edition + "nd";
	        return suffixEdition
	    }
	    if (j == 3 && k != 13) {
	    	suffixEdition = edition + "rd";
	        return suffixEdition
	    }
	    return edition + "th";
	}

	if (edition.value != ""){
		editionAssembled = ordinal_suffix_of(edition.value) + " ed." + ", ";
	}
	else{
		editionAssembled = "";
	}
	return editionAssembled;
}

function assembleVolume() {
	if (volume.value != ""){
		volumeAssembled = "vol. " + volume.value + ", ";
	}
	else{
		volumeAssembled = "";
	}
	return volumeAssembled;
}

function assembleChapter(){
	if (chapterSection.value != ""){
			chapterAssembled = "\"" + chapterSection.value.charAt(0).toUpperCase() + chapterSection.value.slice(1) + ".\" ";
	}
	else{
		chapterAssembled = "";
	}
	return chapterAssembled;
}

function assemblePages(){
	if (pageStart.value != "" && pageEnd.value == ""){
		pagesAssembled = ", p. " + pageStart.value;
	}
	else if (pageStart.value == "" && pageEnd.value != ""){
		pagesAssembled = ", p. " + pageEnd.value;
	}
	else if (pageStart.value != "" && pageEnd.value != ""){
		pagesAssembled = ", pp. " + pageStart.value + "-" + pageEnd.value;
	}
	else{
		pagesAssembled = "";
	}
	return pagesAssembled;
}

function assembleSeries(){
	if (series.value != ""){
		seriesAssembled = " " + series.value.charAt(0).toUpperCase() + series.value.slice(1) + "."
	}
	else{
		seriesAssembled = "";
	}
	return seriesAssembled;
}

function assembleCover(){
	document.getElementById("bookCover").src = bookCover;
}


function citationBookMLA() {
 	assembleAuthorMLA();
 	assembleChapter();
 	assembleBookTitleMLA();
 	assembleEdition();
 	assembleVolume();
 	assembleBookPublisher();
 	assemblePages(); 
 	assembleSeries();

 	document.getElementById("citation-landing").innerHTML = authorAssembled + chapterAssembled+ bookTitleAssembled + editionAssembled + volumeAssembled + publisherAssembled + yearBookPublished.value + pagesAssembled + "." + seriesAssembled;

}