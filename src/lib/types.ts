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

 