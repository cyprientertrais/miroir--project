import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const options = new DocumentBuilder()
    .setTitle('Oyna Miror API documentation')
    .setDescription('LAP5US TEAM')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)

  console.log('Listening at localhost:%s (HTTP)', 3000)
  console.log('Swagger at localhost:%s/swagger (SWAGGER)', 3000)
}
bootstrap()
