$(document).ready(function(){
    //get data from The Random User Generator API
    let randomUserAPIurl = "https://randomuser.me/api/";
    let options = {
        format: "json",
        results: 12,
        nat: "us"
    };
    let fullItemsList = [];
    let displayItems = function(data){
        console.log(data);
        fullItemsList = data.results;
        console.log(fullItemsList);
    };
    $.getJSON(randomUserAPIurl, options, displayItems);

});