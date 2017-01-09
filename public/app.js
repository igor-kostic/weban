'use strict';

angular
    .module('webanApp', [])
    .controller('webanController', function($scope, $http) {
        var vm = $scope;
        var msgs = [];
        console.log('url: ' + vm.url);

        vm.checkURL = function() {

            if (vm.url == null || vm.url.length == 0) {
                vm.msgs = "";
                return false;
            }

            if (!vm.url.startsWith("http")) {
                vm.url = "http://" + vm.url
            }

            vm.loading = true;
            $http.post('/api/checkurl', {url: vm.url})
                .success(function(data) {
					console.log('post /api/checkurl:' + data);
                    vm.msgs = data;
                    vm.loading = false;
                })
                .error(function(data) {
                    console.log('post /api/checkurl Error: ' + data);
                    vm.msgs = data;
                    vm.loading = false;
                });
        };

    });

