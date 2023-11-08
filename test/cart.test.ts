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
    name: 'iphone',
    volume: 1,
    weight: 1,
    price: 101
}]

const cart1 = new Cart(arr1, 'brazil', 'dhl', 'express');
const cart2 = new Cart(arr2, 'italy', 'ups', 'standard');

describe("Total Price of Cart", () => {
    it("Should return 8 for 2 product of cost of 4", () => expect(cart1.calcTotalPrice()).toBe(8))
    it("Should return 101 for 1 product of cost of 101", () => expect(cart2.calcTotalPrice()).toBe(101))
});

describe("Total Standard Delivery", () => {
    it("Should return 20 as total for v = 6 & w = 10 w/ dhl", () => expect(cart1.calcStandardDelivery()).toBe(20))
    it("Should return 7 as total for v = 1 & w = 1 w/ ups", () => expect(cart2.calcStandardDelivery()).toBe(7))
});

describe("add express tax", () => {
    it("Should return 26 for a standard delivery of 20", () => expect(cart1.calcExpressTax()).toBe(26))
    it("Should return 9.1 for a standard delivery of 7", () => expect(cart2.calcExpressTax()).toBe(9.1))
});

describe("Add geographic tax", () => {
    it("Should return 25.22 for brazil delivery tax (-3%)", () => expect(cart1.calcGeoTax()).toBe(25.22))
    it("Should return 10 for italy delivery tax (+3)", () => expect(cart2.calcGeoTax()).toBe(10))
});

describe("Check for free delivery", () => {
    it("Should return 8, the origin delivery price", () => expect(cart1.calcFreeDelivery()).toBe(8))
    it("Should return 0 as delivery cost if totalP >= 100", () => expect(cart2.calcFreeDelivery()).toBe(0))
});