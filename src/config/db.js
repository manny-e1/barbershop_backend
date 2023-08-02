import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_LOCAL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoose.connection.host}`);
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
