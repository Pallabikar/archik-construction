import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (cached.conn) {
    return cached.conn;
  }

  if (!uri) {
    throw new Error('Please define the MONGODB_URI or MONGO_URI environment variable.');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;