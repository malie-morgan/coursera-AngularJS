(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")  //API base path constant: define base URL once and reuse it in dif circumstances using special function called constant. Takes name and base path
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&',   //reference to the function such that its going to get executed by the parent environment
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true,
           //link: FoundItemsDirectiveLink,
            transclude: true
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.foundItems = [];
        var search = "";

        menu.matchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);      //call menu categories service that gets menu categories which returns a promise
            /* promise.then(function (response) {                          //resolve promise using then function, expecting a response
                 menu.Items = response.data;                             //or response.data to be that Json converted into array of obj literals. Then assign that array to the categories property of our menu
             });*/

            promise.then(function (items) {
                if (items && items.length > 0) {
                    menu.warning = '';
                    menu.foundItems = items;
                } else {
                    menu.warning = 'Nothing found!';
                    menu.foundItems = [];
                }
            });
        };

        menu.removeItem = function (itemIndex) {        //remove item from found array
            menu.foundItems.splice(itemIndex, 1);
        };
       /* menu.nothingFound = function(){
            return menu.foundItems.length <= 0;
        };*/
        menu.warning = "";                          //////

 /*       menu.getItems = function () {
            return items;
        };

    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];   //injecting http service
    function MenuSearchService($http, ApiBasePath) {
        var service = this;                                 //creates this service local variable equal to this

/*        service.getMatchedMenuItems = function () {   //getMatchedMenuItem is the main method
            var response = $http({                    //use our http service and configure it using the config object ({})
                method: "GET",                          //with a method of GET which will tell the http service to issue a get request
                url: (ApiBasePath + "/menu_items.json") //Appending URL to the API base path
            });

            return response;                                //after capturing the response line 42 ( which is a promise), return response to caller
        };*/

        service.getMatchedMenuItems = function (searchTerm) {         //getMatchedMenuItem is the main method
            return $http({                                  //use our http service and configure it using the config object ({})
                method: "GET",                              //with a method of GET which will tell the http service to issue a get request
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {

                var foundItems = [];

                for (var i = 0; i < response.data.menu_items.length; i++) {
                    //console.log(response.data.menu_items[i]);
                    if (searchTerm.length > 0 && response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
                        //console.log(response.data.menu_items[i]);
                        foundItems.push(response.data.menu_items[i]);
                    }
            }
            return foundItems;
        });
    };
}
})();

