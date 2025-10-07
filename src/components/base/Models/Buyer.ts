import { IBuyer, TBuyer, Tpayment} from "../../../types/index";

export class Buyer implements IBuyer { 
  protected payment: Tpayment = "";
  protected address: string = "";
  protected email: string = "";
  protected phone: string = "";

  saveData(data: Partial<TBuyer>): void { 
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.address !== undefined) this.address = data.address;
  }

  validate(): Record<string, string>{
    const errors: Record<string, string> = {};
      if (!this.payment) errors.payment = "Не выбран способ оплаты";
      if (!this.email) errors.email = "Не указана электронная почта";
      if (!this.phone) errors.phone = "Не указан номер телефона";
      if (!this.address) errors.address = "Не указан адрес доставки";
      return errors;
  }

  getData(): TBuyer {
    return {
        payment: this.payment,
        email: this.email,
        phone: this.phone,
        address: this.address
      };
  }

  clear(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }
}