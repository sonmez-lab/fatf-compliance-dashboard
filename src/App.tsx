import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CountryDetail from './pages/CountryDetail'
import Comparison from './pages/Comparison'
import Timeline from './pages/Timeline'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/country/:code" element={<CountryDetail />} />
        <Route path="/compare" element={<Comparison />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </Layout>
  )
}

export default App
