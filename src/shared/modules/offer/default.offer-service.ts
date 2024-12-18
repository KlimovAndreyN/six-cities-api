import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { City, CityName, Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferName, OfferCount } from './offer.const.js';
import { CityLocation } from '../../../const.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  private getCity(cityName: CityName): City {
    return {
      name: cityName,
      location: CityLocation[cityName]
    };
  }

  public async create(dto: CreateOfferDto, hostId: string, rating?: number): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.create({ ...dto, hostId, city: this.getCity(dto.city), rating });

    this.logger.info(`New offer created: ${offer.id} - ${offer.title}`);

    return this.findById(offer.id);
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: id })) !== null;
  }

  public async updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const city = (dto.city) ? this.getCity(dto.city) : undefined;

    return this.offerModel
      .findByIdAndUpdate(id, { ...dto, city }, { new: true })
      .populate([OfferName.HostId]);
  }

  public async deleteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(id);
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .populate([OfferName.HostId]);
  }

  public async find(count: number = OfferCount.Default): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({}, {}, { limit: count })
      .sort({ publishDate: SortType.Down });
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isPremium: true }, {}, { limit: OfferCount.Premium })
      .sort({ publishDate: SortType.Down });
  }

  public async incReviewCount(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, {
        '$inc': {
          reviewCount: 1,
        }
      }, { new: true });
  }
}
