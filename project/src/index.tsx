import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { rooms } from './mock/room';
import { comments } from './mock/comment';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      rooms={rooms}
      comments={comments}
    />
  </React.StrictMode>,
);
