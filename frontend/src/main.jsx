import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './css/vendor.css';
import './css/styles.css';

import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import Admin from './pages/admin/Admin';
import AdminStart from './pages/admin/Start';
import AdminHeader from './pages/admin/Header';
import AdminIntro from './pages/admin/Intro';
import AdminAbout from './pages/admin/About';
import AdminGallery from './pages/admin/Gallery';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminFooter from './pages/admin/Footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            index: true,
            element: <AdminStart />,
          },
          {
            path: 'header',
            element: <AdminHeader />,
          },
          {
            path: 'intro',
            element: <AdminIntro />,
          },
          {
            path: 'about',
            element: <AdminAbout />,
          },
          {
            path: 'gallery',
            element: <AdminGallery />,
          },
          {
            path: 'testimonials',
            element: <AdminTestimonials />,
          },
          {
            path: 'footer',
            element: <AdminFooter />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);