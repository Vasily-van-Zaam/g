

function exitPage(){
    var thisWindow = window.open("Listing3.html",'_self');
    var exit = confirm("Хотите закрыть страницу?");
    if(exit){
        thisWindow.close();
    }
}
