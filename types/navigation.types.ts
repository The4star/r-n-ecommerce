export type ProductParamList = {
  Products: undefined;
  ProductDetails: { productID?: string, productTitle?: string };
  Cart: undefined;
}

export type OrdersParamList = {
  Orders: undefined
}

export type AdminParamList = {
  UserProducts: undefined
  EditProduct: { productID?: string, productTitle?: string }
}

export type AuthParamList = {
  Authentication: undefined
}

export type ShopDrawerParamList = {
  ProductNav: ProductParamList;
  OrderNav: OrdersParamList;
  AdminNav: AdminParamList;
}