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

export interface IProductDetail {
  product_picture: string;
  product_name: string;
  price: number;
  description: string;
  stock: number;
}

export interface ProductAdmin {
  id: number;
  product_name: string;
  product_picture: string;
  price: number;
}

export interface OrderProducts {
  product_id: number;
  quantity: number;
}

export interface Transaction {
  id: number;
  payment: {
    id: number;
    order_id: number;
    payment_method: string;
    signature_id: string;
    va_number: string;
  };
  price: number;
  product_id: number;
  product_name: string;
  product_picture: string;
  quantity: number;
  status: string;
  user_id: number;
}

export interface PaymentType {
  id: number;
  order_id: number;
  payment_method: string;
  signature_id: string;
  va_number: string;
}
