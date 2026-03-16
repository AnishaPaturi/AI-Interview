import { RouterProvider } from 'react-router';
import { AppProvider } from './context/AppContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

import { useEffect } from "react";
import { testFirestore } from "../testFirestore";

export default function App() {

  useEffect(() => {
    testFirestore();
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppProvider>
  );
}