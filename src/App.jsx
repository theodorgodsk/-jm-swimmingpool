import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import NyPool from './pages/NyPool'
import OmOs from './pages/OmOs'
import Kontakt from './pages/Kontakt'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ny-pool" element={<NyPool />} />
          <Route path="/renovering" element={<ServiceDetail />} />
          <Route path="/poolservice" element={<ServiceDetail />} />
          <Route path="/pooltag" element={<ServiceDetail />} />
          <Route path="/folieskifte" element={<ServiceDetail />} />
          <Route path="/anlaeg-og-stoeb" element={<ServiceDetail />} />
          <Route path="/om-os" element={<OmOs />} />
          <Route path="/kontakt" element={<Kontakt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
