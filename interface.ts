interface HotelItem {
  _id: string;
  name: string;
  address: string;
  telephone: string;
  picture: string;
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
  bookingDate: Date;
  nameLastname: string;
  tel: string;
  hotel: string;
  createdAt: string;
}
