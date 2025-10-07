import { IProduct, ICatalog } from "../../../types/index";

export class Catalog implements ICatalog {
  protected listItems: IProduct[] = [];
  protected selectedCard: IProduct | null = null;

  setProducts(products: IProduct[]): void{
    this.listItems = products;
  }

  getProducts(): IProduct[] {
    return this.listItems;
  }

  getProductById(id: string): IProduct | undefined { 
    return this.listItems.find(product => product.id === id);
  }

  setSelectedProduct(product: IProduct): void { 
    this.selectedCard = product; 
  }

  getSelectedProduct(): IProduct | null { 
    return this.selectedCard;
  }
}
