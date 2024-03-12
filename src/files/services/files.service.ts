import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigType } from '@nestjs/config';
import { config } from '../../config';
import { errorLog } from 'src/utils/errors/errors';

@Injectable()
export class FilesService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}
  private client = new S3Client({
    region: this.appConfig.s3.region,
    credentials: {
      accessKeyId: this.appConfig.s3.accessKeyId,
      secretAccessKey: this.appConfig.s3.secretAccessKey,
    },
  });

  private logger = new Logger(FilesService.name);

  async uploadFiles(file: Express.Multer.File) {
    const { buffer, originalname, mimetype } = file;
    return this.s3_upload(buffer, originalname, mimetype);
  }

  async s3_upload(file, name, mimetype) {
    const command = new PutObjectCommand({
      Bucket: this.appConfig.s3.bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: this.appConfig.s3.contentDisposition,
    });
    try {
      return this.client.send(command);
    } catch (e) {
      this.logger.error(errorLog(e));
      throw new InternalServerErrorException(e.message);
    }
  }

  async getUrl(name: string) {
    const command = new GetObjectCommand({
      Bucket: this.appConfig.s3.bucket,
      Key: String(name),
    });
    try {
      return getSignedUrl(this.client, command, {
        expiresIn: this.appConfig.s3.expireURL,
      });
    } catch (e) {
      this.logger.error(errorLog(e));
      throw new InternalServerErrorException(e.message);
    }
  }

  async getFile(name: string) {
    const command = new GetObjectCommand({
      Bucket: this.appConfig.s3.bucket,
      Key: String(name),
    });
    try {
      const data = await this.client.send(command);
      return data;
    } catch (e) {
      this.logger.error(errorLog(e));
      throw new InternalServerErrorException(e.message);
    }
  }
}
