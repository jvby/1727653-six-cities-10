import { Ratings } from './types/comment';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Login = '/login',
  NotFound = '*',
}

export const DefaultCity = {
  'location': {
    'latitude': 48.85661,
    'longitude': 2.351499,
    'zoom': 13,
  },
  'name': 'Paris'
};

export enum MapParameters {
  Layer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}

export const CITIES = ['Paris','Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORT_TYPE = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export enum APIRoute {
  Rooms = '/hotels',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum RequestStatus {
  Idle = 'idle',
  Request = 'request',
  Success = 'success',
  Error = 'error',
}

export enum NameSpace {
  Rooms = 'ROOMS',
  Comments = 'COMMENTS',
  User = 'USER',
  UserInterface = 'UI',
  Favorites = 'FAVORITES',
}

export enum SortingType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const MAX_COMMENTS_AMMOUNT = 10;

export const RATINGS: Ratings[] = [
  {
    rating: 5,
    title: 'perfect',
  },
  {
    rating: 4,
    title: 'good',
  },
  {
    rating: 3,
    title: 'not bad',
  },
  {
    rating: 2,
    title: 'badly',
  },
  {
    rating: 1,
    title: 'terribly',
  },
];

export enum CommentRatingValue {
  MinValue = 0,
  MaxValue = 5,
}

export enum CommentLength {
  MinLength = 50,
  MaxLength = 300,
}
