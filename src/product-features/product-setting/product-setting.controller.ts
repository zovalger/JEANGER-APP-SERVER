import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductSettingService } from './product-setting.service';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto';
import { Auth, GetUser } from 'src/user-features/auth/decorators';
import { UserDocument } from 'src/user-features/user/models/user.model';

@Controller('product-setting')
export class ProductSettingController {
  constructor(private readonly productSettingService: ProductSettingService) {}

  @Post()
  @Auth()
  async create(
    @Body() createProductSettingDto: CreateProductSettingDto,
    @GetUser() user: UserDocument,
  ) {
    const data = await this.productSettingService.create(
      createProductSettingDto,
      { userId: user._id.toString() },
    );

    return { data };
  }

  @Get()
  @Auth()
  async findOne(@GetUser() user: UserDocument) {
    const data = await this.productSettingService.findOne('', {
      userId: user._id.toString(),
    });

    return { data };
  }

  @Patch(':id')
  @Auth()
  async update(
    @Param('id') id: string,
    @Body() updateProductSettingDto: UpdateProductSettingDto,
    @GetUser() user: UserDocument,
  ) {
    const data = await this.productSettingService.update(
      id,
      updateProductSettingDto,
      { userId: user._id.toString() },
    );
    return { data };
  }
}
