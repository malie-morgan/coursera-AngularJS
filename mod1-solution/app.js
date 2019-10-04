(function () {
'use strict';

angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.message = "";
    $scope.data = false;

    $scope.checkIfTooMuch = function () {
        if ($scope.dishes.trim().length === 0) {
            $scope.data = false;
        }
        else {
            $scope.data = true;
                if ($scope.dishes.trim().length <= 3) {
                    $scope.message = "Enjoy!";
                }
                else {
                    $scope.message = "Too much!";
                }

        }

    }
}


});

