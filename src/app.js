import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import { BarberModel, ClientModel } from './user/user.schema.js';
import { ShopModel } from './shop/shop.schema.js';
import { ShopReviewSchema } from './reviews/shop_review/shop_review.schema.js';
import { BarberReviewModel } from './reviews/barber_review/barber_review.schema.js';

dotenv.config();
connectDatabase();

const app = express();

app.get('/', async (req, res) => {
  const user = {
    name: 'Barber',
    password: '123456',
    email: 'barber@gmail.com',
    phoneNumber: 4,
    role: 'BARBER',
    gender: 'MALE',
  };
  const shop = {
    name: 'asse barbershop',
  };
  // await ShopModel.create({ ...shop });
  // await BarberModel.create({ ...user });
  // await ShopReviewSchema.create({
  //   reviewer: '61b7512a83d3a98ffb1f18ee',
  //   shop: '61b752e18ef63b9a553f59af',
  //   rating: 3,
  // });
  await BarberReviewModel.create({
    reviewer: '61b7512a83d3a98ffb1f18ee',
    barber: '61b752fd13cd7da8f22ebaa3',
    reviewText: 'great barber',
    rating: 5,
  });
  res.send('created');
});

app.use(cors({ credentials: true }));
app.use(express.json());

export { app };
