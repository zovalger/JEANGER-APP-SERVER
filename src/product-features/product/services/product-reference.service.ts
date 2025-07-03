import { Injectable } from '@nestjs/common';
import { CreateProductReferenceDto, UpdateProductReferenceDto } from '../dto';

@Injectable()
export class ProductReferenceService {
  create(createProductReferenceDto: CreateProductReferenceDto) {
    return 'This action adds a new productReference';
  }

  findAll() {
    return `This action returns all productReference`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productReference`;
  }

  update(id: number, updateProductReferenceDto: UpdateProductReferenceDto) {
    return `This action updates a #${id} productReference`;
  }

  remove(id: number) {
    return `This action removes a #${id} productReference`;
  }
}
