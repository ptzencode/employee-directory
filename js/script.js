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
    let currentList = [];

    //process data from API
    let displayItems = function(data){
        fullItemsList = data.results;
        console.log(fullItemsList);
        showItemsInGallery(fullItemsList);
    };

    $.getJSON(randomUserAPIurl, options, displayItems);

    //display items in gallery
    function showItemsInGallery(itemsList){
        //store items to be displayed
        currentList = itemsList;
        //clear any previous items in gallery
        gallery.empty();
        //create new display with current list
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

    //create modal to display item details
    function showItemDetails(itemToShow){
        let $modalContainer = $(`<div class="modal-container">
                                    <div class="modal">
                                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                        <div class="modal-info-container">
                                            <img class="modal-img" src="${itemToShow.picture.large}" alt="profile picture">
                                            <h3 id="name" class="modal-name cap">${itemToShow.name.first} ${itemToShow.name.last}</h3>
                                            <p class="modal-text">${itemToShow.email}</p>
                                            <p class="modal-text cap">${itemToShow.location.city}</p>
                                            <hr>
                                            <p class="modal-text">${itemToShow.phone}</p>
                                            <p class="modal-text cap">${itemToShow.location.street}, ${itemToShow.location.state} ${itemToShow.location.postcode}</p>
                                            <p class="modal-text">Birthday: ${new Date(itemToShow.dob.date).getMonth() + 1}/${new Date(itemToShow.dob.date).getDate()}/${new Date(itemToShow.dob.date).getFullYear()}</p>
                                        </div>
                                    </div>

                                    <div class="modal-btn-container">
                                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                    </div>
                            </div>`);
        return $modalContainer;
    }

    //display details for item on click
    gallery.on("click","div.card",function(){
        let indexOfCurrentItem = $('div.card').index(this);

        function updateModalDisplay(){
            $('div.modal-container').remove();
            let itemToShow = currentList[indexOfCurrentItem];
            let $modalContainer = showItemDetails(itemToShow);
            $('body').append($modalContainer);
            //hide prev btn at beginning & hide next btn at end
            if(indexOfCurrentItem === 0){
                $('#modal-prev').hide();
            } else if(indexOfCurrentItem === currentList.length -1) {
                $('#modal-next').hide();
            }
            //add click handler for buttons
            $('#modal-prev').click(showPrev);
            $('#modal-next').click(showNext);
            $('#modal-close-btn').click(closeModal);
        }

        //show prev item
        function showPrev(){
          if(indexOfCurrentItem !== 0){
            indexOfCurrentItem -= 1;
            updateModalDisplay();
          }
        }

        //show next item
        function showNext(){
          if(indexOfCurrentItem !== currentList.length -1){
           indexOfCurrentItem += 1;
           updateModalDisplay();
          }
        }

        //close modal
        function closeModal(){
          $('div.modal-container').remove();
        }

        updateModalDisplay();

    });

    //add Search Feature for Gallery
    function addSearch(){
        let $searchContainer = $(`<div class="search-container">
                                    <form action="#" method="get">
                                      <input type="search" id="search-input" class="search-input" placeholder="Enter Name...">
                                      <input type="submit" value="Search" id="search-submit" class="search-submit">
                                    </form>
                                  </div>`);
        $('div.header-inner-container').append($searchContainer);
        $('#search-submit').click(searchGallery);
    }
    addSearch();

    //search gallery
    function searchGallery(e){
        e.preventDefault();
        let $searchBtn = $('#search-submit');
        let $input = $('#search-input');

        let searchInput = $input.val().toLowerCase();
        let matchingItems = [];
        //process search for input value
        if(searchInput !== ''){
            $searchBtn.attr('value','Show All');
            $searchBtn.addClass('reset');
            $input.val('');
            $input.attr('placeholder','')
            $input.prop('disabled',true);

            $.each(fullItemsList,function(index,item){
                let itemName = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`;
                if(itemName.includes(searchInput)){
                    matchingItems.push(item);
                }
            });
            //show search results in gallery
            if(matchingItems.length > 0){
                showItemsInGallery(matchingItems);
            }

        }
    }
});