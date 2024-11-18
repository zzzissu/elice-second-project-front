export interface ItemProps {
  idx: number;
  row: number;

  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  categoryName: string;
  soldOut: boolean;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  __v: 0;
}

export interface CarouselItemProps {
  carouselData: CarouselItem[];
}

export interface CarouselItem {
  id: number;
  imgUrl: string;
  text: string;
}

export interface CartItems {
  id: number;
  itemName: string;
  imageSrc: string;
  price: number;
  description: string;
  shopName: string;
  purchaseDate: string;
}
