import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from './controller.interface.js';
import { Logger } from '../../logger/index.js';
import { Route } from '../types/route.interface.js';
import { HttpError } from '../errors/http-error.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  readonly router: Router;

  constructor(
    protected readonly logger: Logger
  ) {
    this.router = Router();

    this.logger.info(`Register routes for ${this.constructor.name}...`);
  }

  protected throwHttpError(httpStatusCode: number, message: string) {
    throw new HttpError(httpStatusCode, message, this.constructor.name);
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    this.router[route.method](route.path, wrapperAsyncHandler);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(this.DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT, {});
  }

  public notFound<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NOT_FOUND, data);
  }

  public notAllow<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.FORBIDDEN, data);
  }
}
