import { getDetailProduct, getProducts } from "./api";
import { productSchema } from "./scheme";
import {
  ProductFormValues,
  ProductFormProps,
  IProductListData,
  IProductDetail,
} from "./interfaces";

export { productSchema, getProducts, getDetailProduct };
export type {
  ProductFormValues,
  ProductFormProps,
  IProductListData,
  IProductDetail,
};
