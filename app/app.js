var livingPresidents = angular.module('myApp', ['ngAnimate']);

livingPresidents.factory('loadPresidents', function($http) {
  var presidents = $http.get('pres_data.json').success(function(data) {
    sortedPresidentsList = data.sort(function(a, b) {
      return a.took_office > b.took_office ? 1 : -1;
    });
  });
  return presidents;
});

livingPresidents.controller('presidentsController', function(loadPresidents, $scope, $timeout) {

  // Load presidents, then put them on scope.
  //
  loadPresidents.success(function(data) {
    $scope.presidents = data;
  });


  // Set up beginning and end of range slider/counter
  //
  $scope.counter = {
    beginning: 0,
    end: moment().diff(moment('1789-04-30', 'YYYY-MM-DD'), 'days'),
  };

  // Angular overwrites range slider's value to 50 for some reason.
  // Found a workaround here:
  // https://github.com/angular/angular.js/issues/6726#issuecomment-37978282
  //
  // Set the
  $timeout(function() {
    $scope.counter.position = $scope.counter.end;
  });

  // Watch slider value and update dates accordingly
  //
  $scope.$watch('counter.position', function() {
    $scope.dateString = moment('1789-04-30', 'YYYY-MM-DD').add($scope.counter.position, 'days').format("MMMM Do YYYY");
    $scope.chosenDate = moment('1789-04-30', 'YYYY-MM-DD').add($scope.counter.position, 'days').format("YYYY-MM-DD");
  });

  $scope.play = function() {
    $scope.counter.position = 0;
    var player = setInterval(function() {
      if ($scope.counter.position < ($scope.counter.end - 10)) {
        $scope.counter.position = $scope.counter.position + 10;
        $scope.$apply();
      } else {
        $scope.counter.position = $scope.counter.end;
        $scope.$apply();
        clearInterval(player);
      };
    }, 1);
    $scope.stop = function() {
      clearInterval(player);
    };
  };

});

livingPresidents.filter('showPresident', function() {
  return function (input, scope) {
    var shownPresidents = _.filter(input, function(president) {
      return (president.took_office <= scope.chosenDate && (president.death > scope.chosenDate || president.death == null))
    })
    return shownPresidents;
  };
});
