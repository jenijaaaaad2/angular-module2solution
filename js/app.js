(function () {
'use strict';

var toBuyList = [
  { name: "cookies", quantity: 10 },
	{ name: "cakes", quantity: 2 },
	{ name: "ice cream", quantity: 5 },
	{ name: "pizzas", quantity: 5 },
	{ name: "chips", quantity: 10 }
];

var boughtList = [];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
  toBuyCtrl.bought = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;  
  boughtCtrl.items = ShoppingListCheckOffService.getBougthItem();
}

function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items to buy
  var itemsToBuy = toBuyList;
  // List of shopping items bought
  var boughtItems = boughtList;
  //Move item to bought list
  service.buyItem = function (itemIndex) {
	var item =  itemsToBuy[itemIndex];
	service.addBoughtItem(item);
    removeFromItemsToBuy(itemIndex);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  
  service.getBougthItem = function () {
    return boughtItems;
  };
  
  service.addBoughtItem = function (item) {
    boughtItems.push(item);
  };
  
  //private functions
  function removeFromItemsToBuy(itemIndex) {
	  itemsToBuy.splice(itemIndex, 1);
  };
}

})();