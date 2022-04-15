import config from 'config';
import mongoose from 'mongoose';
const db: string = config.get("mongoURI");

export const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

