import { createBrowserRouter } from "react-router-dom";
import FilterPage from "../pages/FilterPage";
import { regionLoader } from "../loaders/regionLoader";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FilterPage />,
        loader: regionLoader,
    },
]);