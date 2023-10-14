export type AddItemModalProps = {
  setupId: string;
};

export type DeleteItemModalProps = {
  itemId: string;
};

export type UpdateItemModalProps = {
  itemId: string;
  itemCategory: string;
  itemType: string;
  itemBrand: string;
  itemModel: string;
};

export type DeleteSetupModalProps = {
  setupId: string;
};

export type UpdateSetupModalProps = {
  setupId: string;
  setupName: string;
};
