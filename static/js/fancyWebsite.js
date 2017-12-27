var citationLanding = document.getElementById('citation-landing');
var isCitationVisible = false;
var open = true;

function checkScreenSize(){
    if (window.innerWidth < 750){
        sidebar_close();
    }
}

checkScreenSize();
window.addEventListener('resize', checkScreenSize);

function sidebarring(){
    if (open == false){
        sidebar_open();
        }
    else{
        sidebar_close();
        }
}

function sidebar_open() {
    open = true;
     var items = document.getElementsByClassName("sidebarItem");
    for(var i = 0; i < items.length; i++){
        items[i].style.display = "inline-block";
    }
    document.getElementById("mySidebar").style.transition = "all 0.5s ease-in-out";
    document.getElementById("sidebarButton").style.transition = "all 0.5s ease-in-out";
    document.getElementById("shortLogo").style.transition = "all 0.5s ease-in-out";
    document.getElementById("mainDiv").style.transition = "all 0.5s ease-in-out";

    document.getElementById("mySidebar").style.backgroundColor = "white";
    document.getElementById("mySidebar").style.width = "220px";
    document.getElementById("mySidebar").style.zIndex = "3";
    document.getElementById("sidebarButton").style.color = "#268BCB";
    document.getElementById("sidebarButton").style.width = "100%";
    document.getElementById("sidebarButton").style.display = "inline-block";
    document.getElementById("sidebarButton").style.margin = "0px auto";
    document.getElementById("shortLogo").style.color = "#268BCB";
    document.getElementById("shortLogo").style.width = "100%";
    document.getElementById("shortLogo").style.margin = "0px auto";
    document.getElementById("shortLogo").style.display = "inline-block";
    document.getElementById("mainDiv").style.marginLeft = "220px";
}


function sidebar_close() {
    open = false;
    var items = document.getElementsByClassName("sidebarItem");
    for(var i = 0; i < items.length; i++){
        items[i].style.display = "none";
    }
    document.getElementById("mySidebar").style.transition = "all 0.5s ease-in-out";
    document.getElementById("sidebarButton").style.transition = "all 0.5s ease-in-out";
    document.getElementById("shortLogo").style.transition = "all 0.5s ease-in-out";
    document.getElementById("mainDiv").style.transition = "all 0.5s ease-in-out";

    document.getElementById("mainDiv").style.margin = "0px auto";
    document.getElementById("mainDiv").style.padding = "0px";
    //document.getElementById("mainDiv").style.zIndex = "-10"
    document.getElementById("mySidebar").style.backgroundColor = "transparent";
    document.getElementById("sidebarButton").style.color = "white";
    document.getElementById("sidebarButton").style.position = "absolute";
    document.getElementById("sidebarButton").style.zIndex = "3";
    document.getElementById("sidebarButton").style.width = "100%";
    document.getElementById("shortLogo").style.display = "none";
    document.getElementById("mySidebar").style.width = "10%"
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