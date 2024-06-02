export interface ProductFormValues {
  product_name: string;
  price: number | string;
  stock: number | string;
  description: string;
  product_picture: File | null;
}

export interface ProductFormProps {
  defaultValues?: ProductFormValues;
  isEditing?: boolean;
}

export interface IProductListData {
  id: number;
  product_picture: string;
  product_name: string;
  price: number;
}
