/*
 * ClickWars 0.1
 *
 * A game of clicks.
 *
 * @author Bryan Potts <pottspotts@gmail.com>
 * @author Matt Montag <matt.montag@gmail.com>
 *
 */

function ClickWarsViewModel() {
  // Setup game parameters
  var self = this;
  this.resources = ko.observableDictionary(Resources);
  this.units = ko.observableDictionary(Units);
  this.buildings = ko.observableDictionary(Buildings);

  // Initialize player
  this.player = window.player;
  _.each(this.resources, function(resource, key) {
    self.player[key] = ko.observable(0);
  });
  _.each(this.units, function(unit, key) {
    self.player[key] = ko.observable(0);
    // alertMessage should probably not exist on the unit object, unless we call it a unit view model.
    unit.alertMessage = ko.observable('');
  });
  _.each(this.buildings, function(building, key) {
    self.player[key] = ko.observable(0);
    building.alertMessage = ko.observable('');
  });

  // Game status - check critical resources' balance
  this.criticalFlag = 0;
  this.gameStatusMsg = ko.observable('Normal');
  this.gameStatusBadge = ko.computed(function(){
    self.criticalFlag = 0; // reset
    _.each(self.resources, function(resource, key){
      if(resource.critical && self.player[key]() < 0){
        self.criticalFlag = 1;
      }
    });
    self.gameStatusMsg(self.criticalFlag ? 'Critical' : 'Normal');
    return self.criticalFlag == 1 ? "label alert-danger" : "label alert-success";
  },this);
}

$.extend(ClickWarsViewModel.prototype, {

  mine: function(resourceKey) {
    var resource = this.resources[resourceKey];
    addObservable(this.player[resourceKey], resource().increment);
  },

  buy: function(unitKey, quantity) { // negative quantity means sell
    var unit = this.units[unitKey];
    if (this.player[unitKey]() + quantity < 0) {
      unit.alertMessage('RRNT');
      setTimeout(function() { unit.alertMessage(''); }, 100);
      return;
    }
    for (var resourceKey in unit.resourceCost) {
      // first pass to verify funds, so we don't have to undo any transactions.
      // we can solve this with some nice functional methods later: http://goo.gl/J3ULxI
      var cost = unit.resourceCost[resourceKey];
      var totalCost = quantity * cost;
      if (this.player[resourceKey]() < totalCost) {
        unit.alertMessage('$');
        setTimeout(function() { unit.alertMessage(''); }, 100);
        return;
      }
    }
    _.each(unit.resourceCost, function(cost, resourceKey) {
      var totalCost = quantity * cost;
      addObservable(this.player[resourceKey], 0-totalCost);
      addObservable(this.player[unitKey], quantity);
    });
  },

  build: function(buildingKey, quantity) { // negative quantity means sell
    var building = this.buildings[buildingKey];
    for (var resourceKey in building.resourceCost) {
      // first pass to verify funds, so we don't have to undo any transactions.
      // we can solve this with some nice functional methods later: http://goo.gl/J3ULxI
      var cost = building.resourceCost[resourceKey];
      var totalCost = quantity * cost;
      if (this.player[resourceKey]() < totalCost) {
        building.alertMessage('$');
        setTimeout(function() { building.alertMessage(''); }, 100);
        return;
      }
    }
    _.each(building.resourceCost, function(cost, resourceKey) {
      var totalCost = quantity * cost;
      addObservable(this.player[resourceKey], 0-totalCost);
      addObservable(this.player[buildingKey], quantity);
    });
  },

  recharge: function () { // subtract resources to pay for units' living expenses
    _.each(this.units, function (unit, unitKey) {
      var unitCount = this.player[unitKey]();
      if (unitCount > 0) {
        _.each(unit.rechargeCost, function (cost, resourceKey) {
          var totalCost = cost * unitCount;
          addObservable(this.player[resourceKey], 0 - totalCost);
          console.log(unitKey + ' recharged for ' + totalCost + ' ' + resourceKey + 's');
        })
      }
    });
  },

  autoMine: function() {
    _.map(this.units, function(unit, unitKey) {
      if (unit.minesFor) {
        addObservable(this.player[unit.minesFor], unit.mineIncrement * this.player[unitKey]());
      }
    });
  }
});

function addObservable(observable, addend) {
  observable(observable() + addend);
}

// Global objects exposed for debugging
window.player = {};
window.cwvm = new ClickWarsViewModel();

$(document).ready(function() {
  ko.applyBindings(cwvm);

  var framerate = 1000; //ms
  var mainloop = function() {
    cwvm.recharge();
    cwvm.autoMine();
  };
  setInterval( mainloop, framerate );

});