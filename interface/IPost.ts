import { IListUser } from './IListUser';

export interface IPost {
  id: string;
  owner: string;
  title: string;
  description: string;
  previewPicture: string;
  address: string;
  maxPeople: number;
  price: number;
  roomType: number;
  roomStatus: number;
  serviceTags: any;
  priceTags: any;
  pictures: string[];
  postsStatus: number;
  ownerInformation?: IListUser;
}
