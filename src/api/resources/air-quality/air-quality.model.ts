import { Schema, model } from 'mongoose';

interface IAirQuality {
  city: string;
  aqius: number;
  aqicn: number;
  mainus?: string;
  maincn?: string;
  createdAt: Date;
  updatedAt: Date;
}

const airQualitySchema = new Schema<IAirQuality>(
  {
    city: {
      type: String,
      default: 'paris',
    },
    aqius: {
      type: Number,
      require: true,
      min: 0,
    },
    aqicn: {
      type: Number,
      required: true,
      min: 0,
    },
    mainus: String,
    maincn: String,
  },
  { timestamps: true }
);

const AirQuality = model<IAirQuality>('AirQuality', airQualitySchema);
export default AirQuality;
