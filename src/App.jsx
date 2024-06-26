import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes/RootRoute";
import TableViewRoute from "./routes/TableViewRoute";
import { Suspense } from "react";
import SplashScreen from "./components/organisms/SpashScreen";
import ToastProvider from "./contexts/ToastProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <TableViewRoute />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SplashScreen />}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>

        <ReactQueryDevtools buttonPosition="top-left" />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
