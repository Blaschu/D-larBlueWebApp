import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import HistoricalGraph from './components/HistoricalGraph';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/historical-graph' element={<HistoricalGraph />} />
            </Routes>
        </Router>
    )
}

export default App;
