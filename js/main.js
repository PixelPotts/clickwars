/*
 * ClickWars 0.1
 *
 * A game of clicks.
 *
 * @author Bryan Potts <pottspotts@gmail.com>
 * @author Matt Montag <matt.montag@gmail.com>
 *
 */

function Resource(name, increment, description){
  this.name = name;
  this.increment = increment;
  this.description = description;
}

function Unit(name, resourceCost, description) {
  this.name = name;
  this.resourceCost = resourceCost || {};
  this.description = description;
}

function ClickWarsViewModel() {
  // Setup game parameters
  this.resources = ko.observableArray(_.toArray(Resources));
  this.units = ko.observableArray([
    new Unit('Miner', { 'Crystal': 60 }, 'Basic unit'),
    new Unit('Marines', { 'Crystal': 30, 'Xenon': 25 }, 'Basic unit'),
    new Unit('T-1000s', {}, 'Basic unit'),
    new Unit('Tanks', {}, 'Basic unit'),
    new Unit('Matt Millers', { 'Twinkies': 10 }, 'Basic unit')
  ]);

  // Initialize player
  this.player = window.player;
  _.each(this.resources(), function(resource) {
    this.player[resource.name] = ko.observable(0);
  });
  _.each(this.units(), function(unit) {
    this.player[unit.name] = ko.observable(0);
    // alertMessage should probably not exist on the unit object, unless we call it a unit view model.
    unit.alertMessage = ko.observable('');
  });
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
});
