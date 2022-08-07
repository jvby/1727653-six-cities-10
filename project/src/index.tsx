import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { rooms } from './mock/room';
import { comments } from './mock/comment';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchRooms } from './store/api-actions';

store.dispatch(fetchRooms());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        rooms={rooms}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
);
