import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStopwatchDto, UpdateStopwatchDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Stopwatch, StopwatchDocument, StopwatchModel } from './models';
import { Model } from 'mongoose';
import { Messages, ModuleItems } from 'src/common/providers/Messages';

@Injectable()
export class StopwatchService {
  constructor(
    @InjectModel(StopwatchModel.name)
    private readonly stopwatchModel: Model<Stopwatch>,
  ) {}

  async create(
    createBillDto: CreateStopwatchDto,
    // systemRequirementsDto: SystemRequirementsDto,
  ): Promise<StopwatchDocument> {
    // const { userId } = systemRequirementsDto;

    const stopwatch = new this.stopwatchModel(createBillDto);

    await stopwatch.save();

    return stopwatch;
  }

  async findAll() {
    const stopwatchs = await this.stopwatchModel.find().sort({ name: 1 });

    return stopwatchs;
  }

  async findOne(id: string) {
    const stopwatch = await this.stopwatchModel.findById(id);

    if (!stopwatch)
      throw new BadRequestException(
        Messages.error.notFound(ModuleItems.stopwatch),
      );

    return stopwatch;
  }

  async update(
    id: string,
    updateBillDto: UpdateStopwatchDto,
    // systemRequirementsDto: SystemRequirementsDto,
  ) {
    await this.findOne(id);

    const stopwatch = await this.stopwatchModel.findByIdAndUpdate(
      id,
      updateBillDto,
      { new: true },
    );

    return stopwatch;
  }

  async remove(
    id: string,
    // systemRequirementsDto: SystemRequirementsDto
  ) {
    const result = await this.stopwatchModel.deleteOne({ _id: id });

    return !!result.deletedCount;
  }
}
