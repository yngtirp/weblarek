import { IApi, IProduct, IApiResponse, IOrderData, IOrderResponse } from "../../../types/index";

export class Communication {
  constructor(private api: IApi) {}

  async getProducts(): Promise<IProduct[]> {
    const data = await this.api.get<IApiResponse>("/product");
    return data.items;
  }

  async sendOrder(order: IOrderData): Promise<IOrderResponse> {
    const response = await this.api.post<IOrderResponse>("/order", order);
    return response;
  }
}