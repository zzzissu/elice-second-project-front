export interface ItemProps {
  id: number;
  idx: number;
  row: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
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
