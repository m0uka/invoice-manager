import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom';
import React from 'react';
import Auth from './pages/auth/Auth';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

let router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth />
    },
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