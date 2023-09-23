import './App.css'
import Layout from './components/layout/layout'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
