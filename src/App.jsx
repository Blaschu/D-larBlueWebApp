import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import HistoricalGraph from './components/HistoricalGraph';
import GapGraph from './components/GapGraph';
import DatepickerCurrency from './components/DatepickerCurrency';


function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/datepicker-currency' element={<DatepickerCurrency title="Dólar Oficial" type="oficial" /> } />
                <Route path='/historical-graph' element={<HistoricalGraph />} />
                <Route path='/gap-graph' element={<GapGraph />} />
            </Routes>
        </Router>
    )
}

export default App;
