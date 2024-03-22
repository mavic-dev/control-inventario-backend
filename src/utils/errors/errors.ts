import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
} from '@nestjs/common';

export const getErrors = (error) => {
  switch (error?.status) {
    case 400:
      throw new BadRequestException(error?.message);
    case 401:
      throw new UnauthorizedException(error?.message);
    case 403:
      throw new ForbiddenException(error?.message);
    case 404:
      throw new NotFoundException(error?.message);
    case 409:
      throw new ConflictException(error?.message);
    case 500:
      throw new InternalServerErrorException(error?.message);
    case 502:
      throw new BadGatewayException(error?.message);
    case 503:
      throw new ServiceUnavailableException(error?.message);
    case 504:
      throw new GatewayTimeoutException(error?.message);
    default:
      throw new InternalServerErrorException(error?.message);
  }
};

export const errorLog = (error) => {
  return JSON.stringify({
    ...error,
    message: error?.message,
  });
};
