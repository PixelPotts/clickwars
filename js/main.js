/*
 * ClickWars 0.1
 *
 * A game of clicks.
 *
 * @author Bryan Potts <pottspotts@gmail.com>
 *
 */

$(document).ready(function(){

  /*
   * View Model
   */
  function ClickWarsViewModel() {
    var self = this;

    function Resource(name,initVal,mineIncrement){
      this.name = name;
      this.value = ko.observable(initVal);
      this.mineIncrement = mineIncrement;
    }

    function Allocation(name,initVal,reqResources) {
      this.name = name;
      this.value = ko.observable(initVal);
      this.reqResources = reqResources;

      this.resourceAlertMsg = ko.observable('');
    }

    Allocation.prototype.checkResources = function(Allocation){
      $.each(this.reqResources, function(resourceName,cost){
        console.log(resourceName);
        balance = window[resourceName].value(); // reference object via name str
        if(balance >= cost){
          window[resourceName].value(balance - cost);
        } else {
          self.resourceAlert(Allocation,resourceName);
        }
      });
    };

    // Resources
    self.resources = ko.observableArray([
      Crystal = new Resource('Crystal',0,8),
      new Resource('Xenon',0,3),
      new Resource('Recruits',0,1)
    ]);
    self.mineResource = function(){
      this.value(this.value() + this.mineIncrement);
    };
    self.resourceAlertMsg = ko.observable('');
    self.resourceAlert = function(Allocation,resourceName){
      Allocation.resourceAlertMsg('$');
    };

    // Allocations
    self.allocations = ko.observableArray([
      new Allocation('Miner',0,{'Crystal':200}),
      new Allocation('Marines',0,{'Crystal':120,'Xenon':25}),
      new Allocation('T-1000s',0,{}),
      new Allocation('Tanks',0,{}),
      new Allocation('Matt Millers',0,{})
    ]);

    self.allocate = function(me,diff){
      //console.log(me); debugger;
      if(me.checkResources(me,diff)){
        me.value(me.value()+diff);
      }
    }
  }

  ko.applyBindings(new ClickWarsViewModel());

});