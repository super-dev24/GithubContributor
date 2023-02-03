import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListView from "./pages/ListView";
import DetailView from "./pages/DetailView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListView />,
  },
  {
    path: "/:user",
    element: <DetailView />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
