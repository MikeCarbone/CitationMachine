var citationLanding = document.getElementById('citation-landing');
let formatOptions = document.getElementsByClassName("format-option");
let isCitationVisible = false;

for (var i = 0; i < formatOptions.length; i++) {
    formatOptions[i].addEventListener("click", function(){
        //Resetting all other button styles
        for (var j = 0; j < formatOptions.length; j++) {
            formatOptions[j].classList.remove("active-option");
        }
        
        //Creating the active button
        this.classList.add("active-option"); 

    });
}

function makeCitationVisible(){
   if (isCitationVisible == false){
        isCitationVisible = true;
        document.getElementById("citation-container").style.display = "block";
        document.getElementById("citation-landing").style.display = "block";
    }
}

document.getElementById("url-home")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("auto-button").click();
    }
});

let text = document.getElementById("citation-copy-text");
let btn = document.getElementById("citation-copy-button");
btn.addEventListener("click", copyText);
function copyText() {
    var citationText = document.getElementById("citation-landing");
    var textToCopy = document.createElement("div");
        textToCopy.style.position = 'absolute';
        textToCopy.style.opacity = '0';
        textToCopy.style.fontSize = '12px';
        textToCopy.style.fontFamily = 'Times New Roman';
        textToCopy.style.paddingLeft = '50px';
        textToCopy.style.textIndent = '-50px';
        textToCopy.id = 'citation-copy-text';
        textToCopy.innerHTML = citationText.innerHTML;
        document.body.appendChild(textToCopy);

    var range = document.getSelection().getRangeAt(0);
    range.selectNode(document.getElementById("citation-copy-text"));
    window.getSelection().addRange(range);
    document.execCommand("copy");

    textToCopy.remove();
}

function badgeWorker(){
    let allBadgeHolders = document.getElementsByClassName('badge-holder');

    if(JSON.parse(localStorage.getItem('allCitations'))){
        for (let badge of allBadgeHolders){
            badge.classList.add('badged');
        }
    } else {
        for (let badge of allBadgeHolders){
            if (badge.className == '/\bbadged\b/') {
                badge.classList.remove('badged');
            }
        }
    }
}
badgeWorker();

const addButton = document.getElementById("citation-add-button");
addButton.addEventListener("click", addCitation);
function addCitation(){
    let currentCitation = document.getElementById("citation-landing").innerHTML;
    let oldCitations = JSON.parse(localStorage.getItem('allCitations')) || [];
    let newCitation = {
        'citation': currentCitation,
        'format': selectedFormat
    };
    
    console.log(oldCitations);

    oldCitations.push(newCitation);
    localStorage.setItem('allCitations', JSON.stringify(oldCitations));

    badgeWorker();

}