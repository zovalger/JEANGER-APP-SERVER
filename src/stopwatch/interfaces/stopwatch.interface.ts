import mongoose from 'mongoose';

export interface IStopwatch {
  _id: string;
  name: string;
  timeDate: number | null;
  accumulatedTime: number;
  timeSeted: number | null;
  createdBy: mongoose.Types.ObjectId | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
