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
