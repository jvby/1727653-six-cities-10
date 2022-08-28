import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { rooms } from './mock/room';
import { comments } from './mock/comment';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchRooms } from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchRooms());
store.dispatch(checkAuthAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App
        rooms={rooms}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
);
