import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from '../city/schemas/city.schema';

@Injectable()
export class SeederService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async seed() {
    await this.cityModel.deleteMany();

    const cities = await this.cityModel.create([
      { name: 'Budapest', latitude: 47.4979, longitude: 19.0402 },
      { name: 'Debrecen', latitude: 47.5316, longitude: 21.6273 },
      { name: 'Hódmezővásárhely', latitude: 46.4311422, longitude: 20.3410358 },
      { name: 'Szeged', latitude: 47.5316, longitude: 21.6273 },
    ]);

    console.log('Data seeded successfully:', { cities });
  }
}
