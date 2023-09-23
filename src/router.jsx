import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Accounts from "./components/accounts/accounts"
import Clusters from "./components/clusters/clusters";
import App from "./App";


const router = (
    createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App />}>
                <Route path='accounts' element={<Accounts />} />
                <Route path='clusters' element={<Clusters />} />
            </Route>
        )
    )
)


export default router 