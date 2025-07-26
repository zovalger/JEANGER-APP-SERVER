import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user-features/user/models/user.model';

export type StopwatchDocument = HydratedDocument<Stopwatch>;

@Schema({ timestamps: true })
export class Stopwatch {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: null })
  timeDate: number | null;

  @Prop({ type: Number, default: 0 })
  accumulatedTime: number;

  @Prop({ type: Number, default: null })
  timeSeted: number | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  createdBy: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const StopwatchSchema = SchemaFactory.createForClass(Stopwatch);

export const StopwatchModel = {
  name: Stopwatch.name,

  useFactory: () => {
    const schema = StopwatchSchema;

    return schema;
  },
};
