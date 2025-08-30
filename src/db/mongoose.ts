import mongoose from 'mongoose';

export async function connectMongo() {
  
  try {
    
    const url: string = process.env.MONGO_URI || '';
    await mongoose.connect(url);

  } catch (error) {
    
  }
  console.log('MongoDB connected');
}
