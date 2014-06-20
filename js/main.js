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
  this.resources = _.toArray(Resources);
  this.units = _.toArray(Units);
  this.buildings = _.toArray(Buildings);

  // Initialize player
  window.player = this.player = {
      resources: [],
      units: [],
      buildings: []
  };
  _.each(this.resources, function(resource, key) {
    self.player.resources[key] = ko.observable(1000);
  });
  _.each(this.units, function(unit, key) {
    self.player.units[key] = ko.observable(0);
    // alertMessage should probably not exist on the unit object, unless we call it a unit view model.
    unit.alertMessage = ko.observable('');
  });
  _.each(this.buildings, function(building, key) {
    self.player.buildings[key] = ko.observable(0);
    building.alertMessage = ko.observable('');
  });

  // Game status - check critical resources' balance
  this.criticalFlag = 0;
  this.gameStatusMsg = ko.observable('Normal');
  this.gameStatusBadge = ko.computed(function(){
    self.criticalFlag = 0; // reset
    _.each(self.resources, function(resource, key){
      if(resource.critical && self.player.resources[key]() < 0){
        self.criticalFlag = 1;
      }
    });
    self.gameStatusMsg(self.criticalFlag ? 'Critical' : 'Normal');
    return self.criticalFlag == 1 ? "label alert-danger" : "label alert-success";
  }, this);
}

$.extend(ClickWarsViewModel.prototype, {

  mine: function(resourceKey) {
    var resource = this.resources[resourceKey];
    addObservable(this.player.resources[resourceKey], resource.increment);
  },

  buy: function(type, key, quantity) { // negative quantity means sell
    var entity = this[type][key];
    if (this.player[type][key]() + quantity < 0) {
      entity.alertMessage('RRNT');
      setTimeout(function() { entity.alertMessage(''); }, 100);
      return;
    }
    for (var resourceName in entity.cost) {
      // first pass to verify funds, so we don't have to undo any transactions.
      // we can solve this with some nice functional methods later: http://goo.gl/J3ULxI
      var cost = entity.cost[resourceName];
      var resourceKey = this.resourceKeyByName(resourceName);
      var totalCost = quantity * cost;
      if (this.player.resources[resourceKey]() < totalCost) {
        entity.alertMessage('$');
        setTimeout(function() { entity.alertMessage(''); }, 100);
        return;
      }
    }
    _.each(entity.cost, function(cost, resourceName) {
      var resourceKey = this.resourceKeyByName(resourceName);
      var totalCost = quantity * cost;
      addObservable(this.player.resources[resourceKey], 0 - totalCost);
      addObservable(this.player[type][key], quantity);
    }, this);
  },

  build: function(buildingKey, quantity) {
    return this.buy('buildings', buildingKey, quantity);
  },

  train: function(unitKey, quantity) {
    return this.buy('units', unitKey, quantity);
  },

  produceAndConsume: function () {
    var self = this;
    _.each(this.units, function (unit, unitKey) {
      var unitCount = self.player.units[unitKey]();
      if (unitCount > 0) {
        _.each(unit.produces, function (amount, resourceName) {
          var resourceKey = self.resourceKeyByName(resourceName);
          var totalAmount = amount * unitCount;
          addObservable(self.player.resources[resourceKey], totalAmount);
        });
        _.each(unit.consumes, function (amount, resourceName) {
          var resourceKey = self.resourceKeyByName(resourceName);
          var totalAmount = amount * unitCount;
          addObservable(self.player.resources[resourceKey], 0 - totalAmount);
        });
      }
    });
  },

  resourceKeyByName: function(name) {
    return this.resources.indexOf(Resources[name]);
  }
});

function addObservable(observable, addend) {
  observable(observable() + addend);
}

// Global objects exposed for debugging
var player;
var cwvm = new ClickWarsViewModel();

$(document).ready(function() {
  ko.applyBindings(cwvm);

  var framerate = 1000; //ms
  var mainloop = function() {
    cwvm.produceAndConsume();
  };
  setInterval(mainloop, framerate);
});