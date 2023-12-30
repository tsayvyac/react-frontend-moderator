import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import {createHashRouter, RouterProvider} from "react-router-dom";
import history from './apis/context/HistoryProvider';

const router = createHashRouter([
    {
        path: '/*',
        element: <App />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} history={history}/>
    </React.StrictMode>
);
