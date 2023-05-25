import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom';
import React from 'react';
import Auth from './pages/auth/Auth';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/dashboard/Dashboard';
import BaseLayout from './components/layout/BaseLayout';
import Invoices from './pages/invoices/Invoices';
import InvoiceView from './pages/invoices/InvoiceView';
import Customers from './pages/customer/Customers';
import Settings from './pages/settings/Settings';

let router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/invoices',
        element: <Invoices />
    },
    {
        path: '/invoices/:id',
        element: <InvoiceView />
    },
    {
        path: '/customers',
        element: <Customers />
    },
    {
        path: '/settings',
        element: <Settings />
    }
]);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary fallback={<div>Oops, something went wrong!</div>}>
                <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
            </ErrorBoundary>
        </QueryClientProvider>
    );
}

export default App