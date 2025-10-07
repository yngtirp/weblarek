import { IProduct, IBasket } from "../../../types/index";

export class Basket implements IBasket{
  protected listItems: IProduct[] = [];

  addProduct(product: IProduct): void { 
    this.listItems.push(product);
  }

  deleteProduct(id: string): void{ 
    this.listItems = this.listItems.filter(item => item.id !== id);
  }

  getQuantityItems(): number{ 
    return this.listItems.length;
  }

  getListItems(): IProduct[] { 
    return this.listItems;
  }

  getTotalCost(): number{ 
    return this.listItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  hasProduct(id: string): boolean { 
    return this.listItems.some(item => item.id === id);
  }
  
  clear(): void { 
    this.listItems = [];
  }
}