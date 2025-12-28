import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // <--- Import this
import { join } from 'path'; // <--- Import this
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  // Update this line to use NestExpressApplication for static asset support
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ ENABLE CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Your React port
    credentials: true,
  });

  // ✅ SERVE UPLOADS FOLDER
  // This makes: http://localhost:3000/uploads/filename.jpg work
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();