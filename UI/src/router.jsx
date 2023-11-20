import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Accounts from "./components/accounts/accounts"
import Clusters from "./components/clusters/clusters";
import Workloads from "./components/workloads/workloads";
import Login from "./components/login/login";
import App from "./App";
import Dashboard from "./components/dashboard/dashboard";



const router = (
    createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<App />}>
                    <Route path='' element={<Dashboard />} />
                    <Route path='accounts' element={<Accounts />} />
                    <Route path='clusters' element={<Clusters />} />
                    <Route path='workloads/:cluster_id' element={<Workloads />} />
                </Route>
            </>
        )
    )
)


export default router 