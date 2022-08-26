import { CITIES } from './const';
import dayjs from 'dayjs';
import { CommentType } from './types/comment';


export const getRating = (rating: number) => Math.floor(rating) * 20;

export const randomInteger = (min: number, max: number) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getRandomCity = () => {
  const randomIndex = randomInteger(0,5);
  const randomCity = CITIES[randomIndex];
  return randomCity;
};

export const humanizeDate = (dueDate: string) => dayjs(dueDate).format('MMMM YYYY');

export const sortCommentsByDate = (commentA: CommentType, commentB: CommentType) => dayjs(commentB.date).diff(commentA.date);
