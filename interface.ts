interface VenueItem {
  _id: string;
  name: string;
  address: string;
  telephone: string;
  picture: string;
  createdAt: Date;
  __v: number;
}

interface VenueJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: VenueItem[];
}

interface BookingItem {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}
