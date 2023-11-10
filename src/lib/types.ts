import { UniqueIdentifier } from '@dnd-kit/core';

export type DeleteProductModalProps = {
  productId: string;
};

export type UpdateProductModalProps = {
  productId: string;
  productCategory: string;
  productName: string;
  productLink: string;
};

export type ProductDNDType = {
  id: UniqueIdentifier;
  product: any;
};

export type ImageDNDType = {
  id: UniqueIdentifier;
  image: any;
};

export type Product = {
  product_id: string;
  product_name: string;
  user_id: string;
  position: number;
  product_link: string;
  product_category: string;
};

export type ImageProps = {
  image_id: string;
  user_id: string;
  image_url: string;
  created_at: string;
  position: number;
};

export type PhotosSectionProps = {
  input: ImageProps[];
};
