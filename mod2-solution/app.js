(function () {
    'use strict';

    var shoppingList = [
        {
            name: "Candy",
            quantity: "2"
        },
        {
            name: "Donuts",
            quantity: "24"
        },
        {
            name: "Cookies",
            quantity: "30"
        },
        {
            name: "Pies",
            quantity: "5"
        },
        {
            name: "Popsicles",
            quantity: "12"
        }
    ];

    var purchasedShoppingList = [];
    var buyList = shoppingList;
    var boughtList = [];

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService(){
    var service = this;
    service.removeItem = function (itemIndex) {
        var item = buyList[itemIndex];
        service.addBoughtList(item);
        removeFromBuyList(itemIndex);
    };

    service.getBuyList = function () {
        return buyList;
    };

    service.getBoughtList = function () {
        return boughtList;
    };

    service.addBoughtList = function (item) {
        boughtList.push(item);
    };

    function removeFromBuyList(itemIndex) {
        buyList.splice(itemIndex,1);
    }
}



    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buy = this;

        buy.items = ShoppingListCheckOffService.getBuyList();

        buy.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeItem(itemIndex);
        };

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtList();


    }

})();