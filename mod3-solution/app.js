(function () {
    'use strict';

    angular.module('NarrowItDOwnApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");  //API base path constant: define base URL once and reuse it in dif circumstances using special function called constant. Takes name and base path


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        var promise = MenuSearchService.getMatchedMenuItems();    //call menu categories service that gets menu categories which returns a promise

        promise.then(function (response) {                          //resolve promise using then function, expecting a response
            menu.Items = response.data;                          //or response.data to be that Json converted into array of obj literals. Then assign that array to the categories property of our menu
        })
            .catch(function (error) {                                   //catch all function
                console.log("Something went terribly wrong.");
            });

        menu.logMenuItems = function (shortName) {                            //logMenuItems function taking shortName as argument
            var promise = MenuSearchService.getMenuForSearch(shortName);  //calling MenuCategoriesService.getMenuForCategory method and passing it shortName

            promise.then(function (response) {                                   //logging response on success
                console.log(response.data);
            })
                .catch(function (error) {                                             //logging error on failure
                    console.log(error);
                })
        };

    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];   //injecting http service
    function MenuSearchService($http, ApiBasePath) {
        var service = this;                         //creates this service local variable equal to this

        service.getMatchedMenuItems = function () {   //getMenuCategories is our main method
            var response = $http({                    //use our http service and configure it using the config object ({})
                method: "GET",                          //with a method of GET which will tell the http service to issue a get request
                url: (ApiBasePath + "/categories.json") //Appending URL to our API base path
            });

            return response;                          //once we capture the response line 42 ( which is a promise), return response to caller
        };


        service.getMenuForCategory = function (shortName) {   //method is getMenuForCategory function that takes shortNsme
            var response = $http({                              //$http service
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),          //links to .constant function
                params: {                                         //params property (obj literal ie {}) as part of config object that has
                    category: shortName                             //category which gets its value shortName that is passed into this function (line 51)
                }
            });

            return response;                                    //return response which is nothing more than a promise
        };

    }

})();

