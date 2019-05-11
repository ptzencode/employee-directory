$(document).ready(function(){
    //get data from The Random User Generator API
    let randomUserAPIurl = "https://randomuser.me/api/";
    const gallery = $('#gallery');
    let options = {
        format: "json",
        results: 12,
        nat: "us,gb,ca"
    };
    let fullItemsList = [];

    //process data from API
    let displayItems = function(data){
        fullItemsList = data.results;
        console.log(fullItemsList);
        showItemsInGallery(fullItemsList);
    };

    $.getJSON(randomUserAPIurl, options, displayItems);

    //display items in gallery
    function showItemsInGallery(itemsList){
        $.each(itemsList,function(index,item){
          let $itemCard = $(`<div class="card">
                              <div class="card-img-container">
                                <img class="card-img" src="${item.picture.large}" alt="profile picture">
                              </div>
                              <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                                <p class="card-text">${item.email}</p>
                                <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
                               </div>
                              </div>`);
          gallery.append($itemCard);
        });
    }
});