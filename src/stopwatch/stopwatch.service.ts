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
    createStopwatchDto: CreateStopwatchDto,
    // systemRequirementsDto: SystemRequirementsDto,
  ): Promise<StopwatchDocument> {
    const { timeDate, timeSeted } = createStopwatchDto;
    // const { userId } = systemRequirementsDto;

    const tocreate = {
      ...createStopwatchDto,
      timeDate: timeDate || null,
      timeSeted: timeSeted || null,
    };

    const stopwatch = new this.stopwatchModel(tocreate);

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
    updateStopwatchDto: UpdateStopwatchDto,
    // systemRequirementsDto: SystemRequirementsDto,
  ) {
    const { timeDate, timeSeted } = updateStopwatchDto;
    // const { userId } = systemRequirementsDto;

    const toUpdate = {
      ...updateStopwatchDto,
      timeDate: timeDate || null,
      timeSeted: timeSeted || null,
    };

    await this.findOne(id);

    const stopwatch = await this.stopwatchModel.findByIdAndUpdate(
      id,
      toUpdate,
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
