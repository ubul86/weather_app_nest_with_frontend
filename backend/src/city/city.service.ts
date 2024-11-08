import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './schemas/city.schema';
import { Model } from 'mongoose';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async getAllCities(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async findByName(cityName: string): Promise<City> {
    return this.cityModel.findOne({ name: cityName }).exec();
  }
}
