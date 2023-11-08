import Product from "../interface/product";

const deliveryTable = {
    weight: [[5, 10, 20],[6.5, 9, 21],[7, 12, 24]],
    volume: [[5.5, 8, 27],[6, 11, 30],[5, 12, 24]]
}

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
        this.totalPrice = 0;
        this.products.forEach((e) => this.totalPrice+=e.price);
        return this.totalPrice;
    }
    calcStandardDelivery = () => {
        let v = 0;
        let w = 0;
        let n = 0;
        this.totalVolume=0;
        this.totalWeight=0;
        this.products.forEach((e) => {
            this.totalVolume+=e.volume;
            this.totalWeight+=e.weight
        });
       switch(this.courier) {
            case 'dhl':
                n = 0;
                break;
            case 'ups':
                n=1;
            case 'fedex':
                n=2;
       }
        if (this.totalWeight < 2) {
            w = deliveryTable.weight[n][0]
        } else if (this.totalWeight > 2 && this.totalWeight < 5) {
            w = deliveryTable.weight[n][1]
        } else {
            w = deliveryTable.weight[n][2]
        }
        if (this.totalVolume < 3) {
            v = deliveryTable.volume[n][0]
        } else if (this.totalVolume > 3 && this.totalVolume < 7) {
            v = deliveryTable.volume[n][1]
        } else {
            v = deliveryTable.volume[n][2]
        }
        
        if (v > w) {
            return v
        } else {
            return w
        }

    }
    calcExpressTax = () => {
        let deliveryPrice = this.calcStandardDelivery();
        return (((30 / 100) * deliveryPrice)+deliveryPrice)
    }
    calcGeoTax = () => {
        let deliveryPrice;
        if (this.delivery === 'standard') {
            deliveryPrice = this.calcStandardDelivery();
        } else {
            deliveryPrice = this.calcExpressTax();
        }

        switch(this.destination) {
            case 'italy':
                return deliveryPrice+3
            case 'brazil':
                return(deliveryPrice-((3 / 100) * deliveryPrice))
            default:
                return deliveryPrice;
        }
    }
    calcFreeDelivery = () => (this.totalPrice >= 100) ? 0 : this.totalPrice
}