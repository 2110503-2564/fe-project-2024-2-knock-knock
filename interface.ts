interface HotelItem {
  _id: string;
  name: string;
  address: string;
  telephone: string;
  picture: string;
  price: number;
  promotion: string;
  rating: number;
  comment: string[];
  createdAt: Date;
  __v: number;
}

interface HotelJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: HotelItem[];
}

interface BookingItem {
  _id: string;
  bookingDate: Date;
  user: string;
  nights: number;
  hotel: string;
  createdAt: Date;
}

interface BookingJson {
  success: boolean;
  count: number;
  data: BookingItem[];
}

interface ReviewItem {
  _id: string;
  rating: number;
  comment: string;
  hotel: string;
  user: string;
  createdAt: Date;
}

interface ReviewJson{
  success: boolean;
  count: number;
  data: ReviewItem[];
}

interface UserItem{
  _id: string;
  name:string;
  phone:string;
  email:string;
  role:string;
  createdAt:Date;
  __v:number;
}

interface UserJson{
  success:boolean;
  data:UserItem[];
}
