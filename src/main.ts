import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, })
  );

  var whitelist = [,...process.env.WHITELIST_API_ORIGINS.split(',').map((el => el.trim()))];
  console.log(whitelist);
  var corsOptions = {
    origin: function (origin, callback) {
      console.log(`peticion desde el origen [${origin}]`);
      if (whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`Error [${origin}] not allowed by CORS`))
      }
    }
  }
  app.enableCors(corsOptions)

  const config = new DocumentBuilder()
    .setTitle('Proyecto Library')
    .setDescription('Documentación del proyecto Library( Books and Auth )')
    .setVersion('1.0')
    .addTag('Books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

  await app.listen(8083);
}
bootstrap();
