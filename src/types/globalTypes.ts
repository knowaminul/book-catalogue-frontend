// export interface IProduct {
//   _id: number;
//   name: string;
//   image: string;
//   price: number;
//   features: string[];
//   status: boolean;
//   rating: number;
//   quantity?: number;
// }

export interface IProduct {
  _id?: number;
  title: string;
  image: string;
  author: string;
  genre: string;
  publicationYear: number;
  quantity?: number;
  user?: string;
}
