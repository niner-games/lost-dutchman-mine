import Trader from "./trader";
import { items } from "../services/startingPrices";
import { Item } from "../types/items";

class Mercantile extends Trader{
    constructor() {
        super();
        this.name = 'Mercantile';
        this.inventory = items;
    }

    getInventory = () => this.inventory;

    setInventory = (inventory: Item[]) => {
        this.inventory = inventory;
    }

    getPrice = (id: number) => this.inventory.find(item => item.id === id)?.price;

    getItem = (id: number) => this.inventory.find(item => item.id === id);

    updateItemQuantity = (id: number, quantity: number) => {
        const item = this.getItem(id);
        if(item) {
            item.quantity = quantity;
            this.setInventory([...this.inventory]);
        }
    }

    updateItemPrice = (id: number, price: number) => {
        const item = this.getItem(id);
        if(item) {
            item.price = price;
            this.setInventory([...this.inventory]);
        }
    }
}

export default Mercantile;