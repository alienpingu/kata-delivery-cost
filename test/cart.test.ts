import Cart from '../src/model/cart';

const arr1 =[{
    name: 'iphone',
    volume: 3,
    weight: 5,
    price: 4
},{
    name: 'iphone 2',
    volume: 3,
    weight: 5,
    price: 4
}]
const arr2 =[{
    name: 'washing machine',
    volume: 1,
    weight: 1,
    price: 101
}]
const arr3 =[{
    name: 'Fiat',
    volume: 3,
    weight: 4,
    price: 50
},
{
    name: 'Bongo',
    volume: 4,
    weight: 3,
    price: 50
},
]

const cart1 = new Cart(arr1, 'italy', 'dhl', 'express');
const cart2 = new Cart(arr2, 'brazil', 'ups', 'standard');
const cart3 = new Cart(arr3, 'congo', 'fedex', 'express');
const cart4 = new Cart(arr1, 'italy', 'ups', 'express');
const cart5 = new Cart(arr1, 'brazil', 'dhl', 'express');

describe("Total Price of Cart", () => {
    it("Should return 8 for 2 product of cost of 4", () => expect(cart1.calcTotalPrice()).toBe(8))
    it("Should return 101 for 1 product of cost of 101", () => expect(cart2.calcTotalPrice()).toBe(101))
    it("Should return 100 for 2 product of cost of 50", () => expect(cart3.calcTotalPrice()).toBe(100))
});

describe("Total Standard Delivery", () => {
    it("Should return 20 as total for v = 6 & w = 10 w/ dhl", () => expect(cart1.calcStandardDelivery()).toBe(20))
    it("Should return 6.5 as total for v = 1 & w = 1 w/ ups", () => expect(cart2.calcStandardDelivery()).toBe(6.5))
    it("Should return 24 as total for v = 7 & w = 7 w/ ups", () => expect(cart3.calcStandardDelivery()).toBe(24))
});

describe("add express tax", () => {
    it("Should return 26 for a standard delivery of 20", () => expect(cart1.calcExpressTax()).toBe(26))
    it("Should return 8.45 for a standard delivery of 6.5", () => expect(cart2.calcExpressTax()).toBe(8.45))
    it("Should return 24 for a standard delivery of 31.2", () => expect(cart3.calcExpressTax()).toBe(31.2))
});

describe("Add geographic tax", () => {
    it("Should return 29 for italy with DHL (+3)", () => expect(cart1.calcGeoTax()).toBe(29))
    it("Should return 27.3 for italy without DHL", () => expect(cart4.calcGeoTax()).toBe(27.3))
    it("Should return 6.305 for brazil with UPS (-3%)", () => expect(cart2.calcGeoTax()).toBe(6.305))
    it("Should return 6.5 for brazil  without UPS", () => expect(cart5.calcGeoTax()).toBe(26))
    it("Should return the delivery price for other country", () => expect(cart3.calcGeoTax()).toBe(31.2))
});

describe("Check for free delivery", () => {
    it("Should return 8, the origin delivery price", () => expect(cart1.calcFreeDelivery()).toBe(8))
    it("Should return 0 as delivery cost if totalP >= 100", () => expect(cart2.calcFreeDelivery()).toBe(0))
});