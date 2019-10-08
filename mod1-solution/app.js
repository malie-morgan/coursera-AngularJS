(function () {
    'use strict';
    angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);
    //LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.dishes = "";
        $scope.message = "";
        $scope.data = false;
        $scope.error = false;
        $scope.checkIfTooMuch = function () {
            if ($scope.dishes.trim().replace(/^\W/, '').length <= 0) {                                  //.replace(/^\W/, '') regex using not operator
                $scope.message = "Please enter lunch dishes first!";
                $scope.data = false;
                $scope.error = true;
            }
            else {
                $scope.data = true;
                $scope.error = false;
                if ($scope.dishes.trim().split(', ').length >= 1  && $scope.dishes.trim().split(', ').length <= 3) {
                    $scope.message = "Enjoy!";
                }
                else {
                    $scope.message = "Too much!";
                }
            }
        }
    }
})();

