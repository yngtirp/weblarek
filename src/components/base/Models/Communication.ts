import { IApi, IProduct, IApiResponse, IOrderData } from "../../../types/index";

export class Communication {
  constructor(private api: IApi) {}

  async getProducts(): Promise<IProduct[]> {
    const data = await this.api.get<IApiResponse>("/product");
    return data.items;
  }

  async sendOrder(order: IOrderData): Promise<object> {
    const response = await this.api.post<object>("/order", order);
    return response;
  }
}