import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import {
  BarberModel,
  ClientModel,
  ShopAdminModel,
} from './user/user.schema.js';
import { ShopModel } from './shop/shop.schema.js';
// import { ShopReviewSchema } from './reviews/shop_review/shop_review.schema.js';
// import { BarberReviewModel } from './reviews/barber_review/barber_review.schema.js';
import Joi from 'joi';
import { DAYS } from './constant/days_enum.js';
import { format, isAfter, isBefore, parseISO } from 'date-fns';
// import { AppointmentModel } from './appointment/appointment.schema.js';

import { errorHandler, notFound } from './middleware/error_handlers.js';

import shopRouter from './shop/shop.route.js';
import authRouter from './user/user.route.js';
import barberReviewRouter from './reviews/barber_review/barber_review.route.js';
import shopReviewRouter from './reviews/shop_review/shop_review.route.js';

dotenv.config();
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

// app.post('/', async (req, res) => {
//   console.log(req.body);
//   const user = {
//     name: 'Shop Admin',
//     password: '123456',
//     email: 'shopadmin@gmail.com',
//     phoneNumber: 4,
//     role: 'SHOPADMIN',
//     gender: 'MALE',
//   };
//   const shop = {
//     name: 'asse barbershop',
//   };
//   // await ShopModel.create({ ...shop });
//   // await ShopAdminModel.create({ ...user });
//   // await ShopReviewSchema.create({
//   //   reviewer: '61b7512a83d3a98ffb1f18ee',
//   //   shop: '61b752e18ef63b9a553f59af',
//   //   rating: 3,
//   // });
//   // await BarberReviewModel.create({
//   //   reviewer: '61b7512a83d3a98ffb1f18ee',
//   //   barber: '61b752fd13cd7da8f22ebaa3',
//   //   reviewText: 'great barber',
//   //   rating: 5,
//   // });
//   // console.log(Object.values(DAYS));
//   const val = Joi.object({
//     availableDays: [
//       Joi.array().items(Joi.string().valid(...Object.values(DAYS))),
//     ],
//   });

//   const availableDays = ['Monday', 'Tuesday'];

//   const body = {
//     availableDays,
//   };
//   // try {
//   //   const g = await val.validateAsync(body);
//   //   console.log(g);
//   // } catch (error) {
//   //   console.log(error.message);
//   // }

//   // await BarberModel.updateOne(
//   //   {
//   //     _id: '61b752fd13cd7da8f22ebaa3',
//   //   },
//   //   body
//   // );

//   // const appointment = await AppointmentModel.create({
//   //   client: '61b7512a83d3a98ffb1f18ee',
//   //   barber: '61b752fd13cd7da8f22ebaa3',
//   //   shop: '61b8a50e81a5f9502f14f798',
//   //   startTime: new Date(2021, 12, 16, 2, 45),
//   //   endTime: new Date(2021, 12, 16, 3),
//   // });

//   // const shops = await BarberReviewModel.find().populate('barber');
//   const appoint = await AppointmentModel.findById('61b9d5da4c7dcab81acd6de1');

//   const time = new Date();
//   const v = format(time, 'EEEE');
//   res.send((appoint.startTime, appoint.endTime));
// });

app.use('/shops', shopRouter);
app.use('/auth', authRouter);
app.use('/barber_reviews', barberReviewRouter);
app.use('/shop_reviews', shopReviewRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
