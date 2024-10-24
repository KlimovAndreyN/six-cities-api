import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { DetailOfferRdo } from './rdo/detail-offer.rdo.js';
import { OfferRdo } from './rdo/offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:id', method: HttpMethod.Put, handler: this.update });
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.find });
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      //hostId: '6715d930924dfbd3e73a0fcf' //! временно
      hostId: '671797ceed73d6ef04c13d63' //! временно
    });

    //! временно
    console.log(result);
    //! hostid, оставляет только _id
    console.log(fillDTO(DetailOfferRdo, result));

    this.created(res, fillDTO(DetailOfferRdo, result));
  }

  public async index(req: Request, res: Response): Promise<void> {
    //! временно
    console.log('req.query:', req.query);
    //const { count, premium: isPremium } = req.query;

    const offers = await this.offerService.find();
    //! premium
    //const offers = await this.offerService.findPremium();

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async update(_req: Request/*{ params, body }: CreateOfferRequest*/, _res: Response): Promise<void> {
    //const id = params.id.toString();
    //! throw - "Cast to ObjectId failed for value \"67189abb70d1c82e25abc7b6-\" (type string) at path \"_id\" for model \"OfferEntity\""
    // null не возвращает...
    //const offer = await this.offerService.findById(id);

    /*
    if (offer) {
      this.ok(res, fillDTO(DetailOfferRdo, offer));
    } else {
      this.notFound(res, { id });
    }
    */
    this.throwHttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  }

  public async find(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //! throw - "Cast to ObjectId failed for value \"67189abb70d1c82e25abc7b6-\" (type string) at path \"_id\" for model \"OfferEntity\""
    // null не возвращает...
    const offer = await this.offerService.findById(id);

    if (offer) {
      this.ok(res, fillDTO(DetailOfferRdo, offer));
    } else {
      this.notFound(res, { id });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //! throw - "Cast to ObjectId failed for value \"67189abb70d1c82e25abc7b6-\" (type string) at path \"_id\" for model \"OfferEntity\""
    // null не возвращает...
    const offer = await this.offerService.deleteById(id);

    if (offer) {
      this.noContent(res);
    } else {
      this.notFound(res, { id });
    }
  }
}
