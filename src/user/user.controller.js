import createError from 'http-errors';
import { checkID } from '../helpers/check_id.js';
import { signAccessToken } from '../middleware/jwt_helpers.js';
import { getUser, registerUser } from './user.service.js';

export async function httpRegisterUser(req, res) {
  const emailExists = await getUser({ email: req.body.email });
  console.log(emailExists);
  if (emailExists)
    throw createError.Conflict(`${req.body.email} is already in use.`);
  await registerUser(req.body);
  res.status(201).json({ message: "you're registered successfully" });
}

export async function httpLogin(req, res) {
  const user = await getUser({ email: req.body.email });
  if (!user) throw createError.Unauthorized('Invalid Credential');
  if (user.password !== req.body.password)
    throw createError.Unauthorized('Invalid Credential');
  const accessToken = await signAccessToken(user.id, user.role);
  res.status(200).json({ accessToken });
}

export async function httpGetUserByID(req, res) {
  checkID(
    req.params.id,
    createError.UnprocessableEntity,
    'please enter a real ID'
  );
  const user = await getUser({ _id: req.params.id });
  if (!user) throw createError.NotFound("user doesn't exist");
  res.status(200).json(user);
}
