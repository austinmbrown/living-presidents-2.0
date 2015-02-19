'use strict';

describe('Unit: presidentsController', function() {
  beforeEach(module('myApp'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('presidentsController', {
      $scope: scope
    });
    $httpBackend.whenGET('pres_data.json').respond([])
  }));

  it('should set counter.beginning to 0',
    function() {
      expect(scope.counter.beginning).toEqual(0);
    })

  it('should set counter.end to the number of days since 1789-04-30',
    function() {
      expect(scope.counter.end).toBeGreaterThan(82471);
    })

  it('should increase chosenDate as counter increases',
    function() {
      scope.counter.position = 0;
      scope.$apply();
      expect(scope.chosenDate).toEqual('1789-04-30');

      scope.counter.position = 82472;
      scope.$apply();
      expect(scope.chosenDate).toEqual('2015-02-17');
    })

  it('should ')

})
