import { createBrowserRouter, Outlet } from "react-router-dom"
import FetchData from "./Components/crud/FetchData"
import Header from "./Components/Header"

import Create from "./Components/crud/Create"
import EditModal from "./Components/crud/EditModal";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <FetchData />,
      },
      {
        path: "create",
        element: <Create />,
      },
        {
        path: "edit/:id",
        element: <EditModal />,
      },
    ],
  },
]);

function App() {

  return (
    <>
        <Header />
        <Outlet />
     

    </>
  )
}

export default App
