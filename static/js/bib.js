function generator(){
	let citationList = JSON.parse(localStorage.getItem('allCitations'));
	
	//Check to make sure its not empty
	if (citationList) {
		citationList = citationList.sort().reverse();

		let formatCounts = {}; 

		citationList.forEach(function(citation, i) {
			
			//Checks to see which format is most prevalent
			if (Object.keys(formatCounts).length != 0){
				if ([citation.format] in formatCounts){
					formatCounts[citation.format] += 1;
				} else {
					formatCounts[citation.format] = 1;
				}
			} else {
				formatCounts[citation.format] = 1;
			}


			let newCitationEntry = document.createElement("p");
				newCitationEntry.innerHTML = citation.citation;
				newCitationEntry.classList.add("paper__citation");
			document.getElementsByClassName("paper__citation-list")[0].appendChild(newCitationEntry);
		});
		
		let highestValue = Object.keys(formatCounts).reduce((a, b) => formatCounts[a] > formatCounts[b] ? a : b);
		console.log(highestValue);
		let bibTitle;
		switch(highestValue){
			case 'APA':
				bibTitle = 'References';
				break;
			case 'MLA':
				bibTitle = 'Works Cited';
				break;
			case 'Chicago':
				bibTitle = 'Bibliography';
				break;
		}
		console.log(bibTitle);
		document.getElementById("bib-title").innerHTML = bibTitle;

	}
}
generator();

const clearButton = document.getElementById("clear-all-button");
clearButton.addEventListener("click", clearAllCitations);

function clearAllCitations(){
	localStorage.clear("allCitations");
	while(document.getElementsByClassName("paper__citation-list")[0].firstChild){
		document.getElementsByClassName("paper__citation-list")[0].removeChild(document.getElementsByClassName("paper__citation-list")[0].firstChild);
	}
}
