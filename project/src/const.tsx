
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

export const defaultCity = {
  'location': {
    'latitude': 52.370216,
    'longitude': 4.895168,
    'zoom': 10,
  }
};

export enum MapParamenters {
  Layer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}

