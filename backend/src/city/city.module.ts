import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './schemas/city.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    HttpModule,
  ],
  providers: [CityService],
  controllers: [CityController],
  exports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    CityService,
  ],
})
export class CityModule {}
