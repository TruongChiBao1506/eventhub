// export interface EventModel {
//     authorId: string;
//     description: string;
//     endAt: number;
//     imageUrl: string;
//     location: Location;
//     startAt: number;
//     title: string;
//     user: string[];
//   }
  
//   export interface Location {
//     address: string;
//     title: string;
//   }
export interface EventModel {
  __v: number;
  _id: string;
  authorId: string;
  category: string;
  createAt: string;
  date: number;
  description: string;
  endAt: number;
  locationAddress: string;
  locationTitle: string;
  photoUrl: string;
  position: Position;
  price: string;
  startAt: number;
  title: string;
  updateAt: string;
  user: any[];
  followers?: string[];
  joined: string[];
}

export interface Position {
  _id: string;
  lat: any;
  long: any;
}