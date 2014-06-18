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
  this.resources = ko.observableArray(_.toArray(Resources));
  this.units = ko.observableArray(_.toArray(Units));
  this.buildings = ko.observableArray(_.toArray(Buildings));

  // Initialize player
  this.player = window.player;
  _.each(self.resources(), function(resource) {
    self.player[resource.name] = ko.observable(0);
  });
  _.each(self.units(), function(unit) {
    self.player[unit.name] = ko.observable(0);
    // alertMessage should probably not exist on the unit object, unless we call it a unit view model.
    unit.alertMessage = ko.observable('');
  });
  _.each(self.buildings(), function(building) {
    self.player[building.name] = ko.observable(0);
    // alertMessage should probably not exist on the unit object, unless we call it a unit view model.
    building.alertMessage = ko.observable('');
  });

  // Game status - check critical resources' balance
  self.criticalFlag = 0;
  self.gameStatusMsg = ko.observable('Normal');
  self.gameStatusBadge = ko.computed(function(){
    self.criticalFlag = 0; // reset
    _.each(self.resources(), function(resource){
      if(resource.critical && self.player[resource.name]() < 0){
        self.criticalFlag = 1;
      }
    });
    self.gameStatusMsg(self.criticalFlag ? 'Critical' : 'Normal');
    return self.criticalFlag == 1 ? "label alert-danger" : "label alert-success";
  },this);
}

$.extend(ClickWarsViewModel.prototype, {

  mine: function(resource) {
    addObservable(this.player[resource.name], resource.increment);
  },

  buy: function(unit, quantity) { // negative quantity means sell
      if (this.player[unit.name]() + quantity < 0) {
        unit.alertMessage('RRNT');
        setTimeout(function() { unit.alertMessage(''); }, 100);
        return;
      }
      for (var resourceName in unit.resourceCost) {
      // first pass to verify funds, so we don't have to undo any transactions.
      // we can solve this with some nice functional methods later: http://goo.gl/J3ULxI
      var cost = unit.resourceCost[resourceName];
      var totalCost = quantity * cost;
      if (this.player[resourceName]() < totalCost) {
        unit.alertMessage('$');
        setTimeout(function() { unit.alertMessage(''); }, 100);
        return;
      }

    }
    _.each(unit.resourceCost, function(cost, resourceName) {
      var totalCost = quantity * cost;
      addObservable(this.player[resourceName], 0-totalCost);
      addObservable(this.player[unit.name], quantity);
    });
  },

  build: function(building, quantity) { // negative quantity means sell
      for (var resourceName in building.resourceCost) {
      // first pass to verify funds, so we don't have to undo any transactions.
      // we can solve this with some nice functional methods later: http://goo.gl/J3ULxI
      var cost = building.resourceCost[resourceName];
      var totalCost = quantity * cost;
      if (this.player[resourceName]() < totalCost) {
        building.alertMessage('$');
        setTimeout(function() { building.alertMessage(''); }, 100);
        return;
      }

    }
    _.each(building.resourceCost, function(cost, resourceName) {
      var totalCost = quantity * cost;
      addObservable(this.player[resourceName], 0-totalCost);
      addObservable(this.player[building.name], quantity);
    });
  },

  recharge: function() { // subtract resources to pay for units' living expenses
    _.each(this.units(), function(unit) {
      var unitCount = this.player[unit.name]();
      if(unitCount > 0){
        _.each(unit.rechargeCost, function(cost, resourceName){
          var totalCost = cost * unitCount;
          addObservable(this.player[resourceName], 0-totalCost);
          console.log(unit.name+' recharged for '+totalCost+' '+resourceName+'s');
        })
      }
    });
  },

  autoMine: function() {

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