import { Expose } from 'class-transformer';
import { City, Location, OfferGoods, OfferType } from '../../../types/index.js';
import { UserEntity } from '../../user/user.entity.js';

export class DetailOfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publishDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public type: OfferType;

  @Expose()
  public rooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: OfferGoods;

  @Expose()
  public hostId: UserEntity;
  //! host

  @Expose()
  public location: Location;
}
