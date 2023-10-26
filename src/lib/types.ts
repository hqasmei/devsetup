import { UniqueIdentifier } from '@dnd-kit/core';

export type DeleteProductModalProps = {
  productId: string;
};

export type UpdateProductModalProps = {
  productId: string;
  productName: string;
};

export type DNDType = {
  id: UniqueIdentifier;
  product: any;
};

export type ContainerProps = {
  id: UniqueIdentifier;
  product: any;
};
