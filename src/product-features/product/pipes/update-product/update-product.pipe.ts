import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpdateProductPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('pipe');
    console.log(value);
    console.log(metadata);

    return value;
  }
}
