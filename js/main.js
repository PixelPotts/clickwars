/*
 * ClickWars 0.1
 *
 * @author Bryan Potts <pottspotts@gmail.com>
 * @author Matt Montag <matt.montag@gmail.com>
 *
 */

$(document).ready(function(){

  function Resource(name,initialValue,mineIncrement){
    this.name = name;
    this.value = initialValue;
    this.mineIncrement = mineIncrement;
  }

  Resource.prototype.increment = function(amt){
    return this.value += amt;
  };

  Resource.prototype.getValue = function(){
    return this.value;
  };

  Resource.prototype.allocate = function(Item){

  };



  /*
   * Global resource actions (mining clicks, purchases, etc.)
   */

  function Global() {}


  /*
   * Initialize game board
   */

  // Resources
  var Crystals = new Resource('crystal',0,8);
  var Xenon = new Resource('xenon',0,3);
  var Marines = new Resource('recruits',5,1);


});