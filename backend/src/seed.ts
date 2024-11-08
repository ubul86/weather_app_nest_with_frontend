import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seederService = app.get(SeederService);

  await seederService.seed();

  await app.close();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
