import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const { server, project, swagger } =
    app.get<ConfigService>(ConfigService)['internalConfig']['config'];

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(project.name)
      .setDescription(project.description)
      .setVersion(project.version)
      .build();
    const document = SwaggerModule.createDocument(app, config, {});
    SwaggerModule.setup(`/${swagger.path}`, app, document);
  }

  await app.listen(server.port, () => {
    Logger.log(`App running on port : ${server.port}`);
    swagger.enabled &&
      Logger.log(
        `Swagger URL: http://localhost:${server.port}/${swagger.path}`,
      );
  });
}
bootstrap();
