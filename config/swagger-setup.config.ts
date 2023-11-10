import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app: INestApplication) {
  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('To do API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
