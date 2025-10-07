import './scss/styles.scss';
import { Catalog } from './components/base/Models/Catalog';
import { Basket } from './components/base/Models/Basket';
import { Buyer } from './components/base/Models/Buyer';
import { Communication } from './components/base/Models/Communication';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { IProduct, TBuyer } from './types';

const catalog = new Catalog();
const basket = new Basket();
const buyer = new Buyer();
const communication = new Communication(new Api(API_URL));

async function test() {

  // тест слоя коммуникации 

  // получение данных
  const products: IProduct[] = await communication.getProducts();
  console.log('Товары полученные с сервера:', products);

  // отправка данных
  try {
    const response = await communication.sendOrder({
      "payment": "online",
      "email": "test@test.ru",
      "phone": "+71234567890",
      "address": "Spb Vosstania 1",
      "total": 2200,
      "items": [
          "854cef69-976d-4c2a-a18c-2aa45046c390",
          "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
      ]
  });
    console.log('Ответ сервера на заказ:', response);
  } catch (err) {
    console.error('Ошибка при отправке заказа:', err);
  }

  // тест класса Catalog
  console.log("-- ТЕСТ КЛАССА Catalog --")
  catalog.setProducts(products);
  console.log('Список товаров сохранен в модели Catalog:', catalog.getProducts());

  const firstProduct = catalog.getProducts()[0];
  catalog.setSelectedProduct(firstProduct);
  console.log('Выбранный товар:', catalog.getSelectedProduct());

  const foundProduct = catalog.getProductById(firstProduct.id);
  console.log('Товар найден по id:', foundProduct);

  // тест класса Basket 
  console.log("-- ТЕСТ КЛАССА Basket --")
  basket.addProduct(firstProduct);
  console.log('После добавления товара:', basket.getListItems());

  console.log('Есть ли товар в корзине?', basket.hasProduct(firstProduct.id));

  console.log('Количество товаров в корзине:', basket.getQuantityItems());
  console.log('Общая стоимость корзины:', basket.getTotalCost());

  basket.deleteProduct(firstProduct.id);
  console.log('После удаления товара:', [...basket.getListItems()]);


  basket.addProduct(firstProduct);
  console.log('Товары в корзине:', basket.getListItems());
  basket.clear();
  console.log('После очистки корзины:', basket.getListItems());

  // тест класса Buyer
  console.log("-- ТЕСТ КЛАССА Buyer --")
  const buyerData: Partial<TBuyer> = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1"
  };

  buyer.saveData(buyerData);
  console.log('Сохраненные данные покупателя:', buyer.getData());

  const validationErrors = buyer.validate();
  console.log('Результаты валидации:', validationErrors);

  buyer.clear();
  console.log('После очистки данных:', buyer.getData());
}

test();
