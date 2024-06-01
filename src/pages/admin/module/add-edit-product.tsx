import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import {
  ProductFormProps,
  ProductFormValues,
} from "@/utils/apis/products/interfaces";

import { productSchema } from "@/utils/apis/products/scheme";

const AddEditProducts: React.FC<ProductFormProps> = ({ defaultValues }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = (data: ProductFormValues) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price as string),
      stock: parseInt(data.stock as string, 10),
    };
    console.log(formattedData); // Lakukan sesuatu dengan data produk di sini
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <div className="min-w-[300px] max-w-[912px] mx-auto h-full pt-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-start flex-col lg:flex-row rounded-lg p-2 gap-y-8 lg:gap-y-0 gap-x-8 border-2"
          >
            <FormField
              control={form.control}
              name="product_picture"
              render={() => (
                <div className="min-w-[300px] h-full flex items-start justify-center flex-col gap-y-4">
                  <figure>
                    <img
                      src={selectedImage || "/public/assets/300x300.png"}
                      alt="Product"
                      className="rounded-lg min-w-[300px]"
                    />
                  </figure>
                  <FormItem>
                    <FormControl>
                      <Controller
                        name="product_picture"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                                handleImageChange(file);
                              }
                            }}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <div className="w-full flex justify-start flex-col gap-y-2">
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        type="textarea"
                        placeholder="Enter description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-start gap-x-4">
                <Button type="submit" className="mt-4">
                  Edit
                </Button>
                <Button variant={"destructive"} type="submit" className="mt-4">
                  Delete
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default AddEditProducts;
