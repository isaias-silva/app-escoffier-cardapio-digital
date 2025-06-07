import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  
 const config = new DocumentBuilder()
    .setTitle("Escoffier api")
    .setDescription('rest api for digital menus.')
    .setVersion('1.0')
    
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
 
  SwaggerModule.setup('documentation', app, document)



  await app.listen(process.env.PORT || 3000);
}
bootstrap();
