export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    price: number | null;
    description: string;
}

export type Tpayment = "online" | "offline" | "";

export interface TBuyer {
    payment: Tpayment;
    address: string;
    email: string;
    phone: string;
}

export interface ICatalog { 
    setProducts(products: IProduct[]): void;
    getProducts(): IProduct[];
    getProductById(id: string): IProduct | undefined;
    setSelectedProduct(product: IProduct): void;
    getSelectedProduct(): IProduct | null;
}

export interface IBasket {
    addProduct(product: IProduct): void;
    deleteProduct(id: string): void;
    getQuantityItems(): number;
    getListItems(): IProduct[];
    getTotalCost(): number;
    hasProduct(id: string): boolean;
    clear(): void;
}

export interface IBuyer { 
    saveData(data: Partial<TBuyer>): void;
    validate(): Record<string, string>;
    getData(): TBuyer;
    clear(): void;
}

export interface IApiResponse {
    items: IProduct[];
  }

export interface IOrderData extends TBuyer{
    items: string[];
    total: number;
}

export interface ICommunication { 
    getProducts(): Promise<IProduct[]>;
    sendOrder(order: IOrderData): Promise<object>;
}
  