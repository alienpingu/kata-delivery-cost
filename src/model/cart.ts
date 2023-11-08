import Product from "../interface/product";

const deliveryTable = {
  weight: [[5, 10, 20], [6.5, 9, 21], [7, 12, 24]],
  volume: [[5.5, 8, 27], [6, 11, 30], [5, 12, 24]],
};

export default class Cart {
  products: Product[];
  totalPrice: number;
  totalWeight: number;
  totalVolume: number;
  destination: string;
  courier: string;
  delivery: string;

  constructor(products: Product[], destination: string, courier: string, delivery: string) {
    this.products = products;
    this.destination = destination;
    this.courier = courier;
    this.delivery = delivery;
    this.totalPrice = 0;
    this.totalWeight = 0;
    this.totalVolume = 0;
  }

  calcTotalPrice = () => {
    this.totalPrice = this.products.reduce((total, e) => total + e.price, 0);
    return this.totalPrice;
  }

  calcStandardDelivery = () => {
    const n = this.courier === "dhl" ? 0 : this.courier === "ups" ? 1 : 2;
    this.totalVolume = this.products.reduce((total, e) => total + e.volume, 0);
    this.totalWeight = this.products.reduce((total, e) => total + e.weight, 0);

    const weightCategory = this.totalWeight < 2 ? 0 : this.totalWeight < 5 ? 1 : 2;
    const volumeCategory = this.totalVolume < 3 ? 0 : this.totalVolume < 7 ? 1 : 2;
    
    return Math.max(deliveryTable.weight[n][weightCategory], deliveryTable.volume[n][volumeCategory]);
  }

  calcExpressTax = () => {
    const deliveryPrice = this.calcStandardDelivery();
    return (0.3 * deliveryPrice) + deliveryPrice;
  }

  calcGeoTax = () => {
    const deliveryPrice = this.delivery === "standard" ? this.calcStandardDelivery() : this.calcExpressTax();

    switch (this.destination) {
      case "italy":
        return deliveryPrice + 3;
      case "brazil":
        return deliveryPrice - (0.03 * deliveryPrice);
      default:
        return deliveryPrice;
    }
  }

  calcFreeDelivery = () => (this.totalPrice >= 100) ? 0 : this.totalPrice;
}