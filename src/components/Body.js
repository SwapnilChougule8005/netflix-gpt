import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
     {
        path:"/",
        element: <Login/>
     },
     {
        path:"/Browse",
        element: <Browse/>
     }
])

const Body = () => {
    return (
        <div>
           <RouterProvider router={appRouter} />
        </div>
    )
}
export default Body;
