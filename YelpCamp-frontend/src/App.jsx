import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserProvider }  from './Context/UserContext'; // 引入 UserContext.Provider
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/home';
import Flash from './Components/Flash';
import Error from './Components/Error';
import Register from './Pages/Users/Register';
import Login from './Pages/Users/Login';
import CampgroundsIndex from './Pages/Campgrounds/Index';
import CampgroundShow from './Pages/Campgrounds/Show';
import NewCampground from './Pages/Campgrounds/New';
import EditCampground from './Pages/Campgrounds/Edit';
import Layout from './Components/Layout';

function App() {
  return (
    // 使用 UserProvider 包裹整个应用，提供用户状态
    <UserProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Helmet 用于管理 <head> 部分 */}
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>YelpCamp</title>
            {/* 引入 mapbox 样式 */}
            <link href='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css' rel='stylesheet' />
          </Helmet>

          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campgrounds" element={<Layout><CampgroundsIndex /></Layout>} />
              <Route path="/campgrounds/new" element={<Layout><NewCampground /></Layout>} />
              <Route path="/campgrounds/:id" element={<Layout><CampgroundShow /></Layout>} />
              <Route path="/campgrounds/:id/edit" element={<Layout><EditCampground /></Layout>} />
              <Route path="/users/register" element={<Layout><Register /></Layout>} />
              <Route path="/users/login" element={<Layout><Login /></Layout>} />
              <Route path="/users/logout" element={<Layout><Login /></Layout>} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;