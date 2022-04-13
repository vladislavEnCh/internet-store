export interface IUser {
  email: string;
  password: string | number;
  returnSecureToken: boolean;
}

export interface IFbResponse {
  name: string;
}
export interface IProduct {
  type?: string;
  id?: string;
  title?: string;
  photo?: string;
  info?: string;
  price?: string;
  date?: any;
  priceDiscont?: string;
}
