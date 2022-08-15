import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { rooms } from './mock/room';
import { comments } from './mock/comment';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { checkAuthAction, fetchRooms } from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

store.dispatch(fetchRooms());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
