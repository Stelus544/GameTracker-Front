import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLibrary from './components/GameLibrary';
import AddGameForm from './components/AddGameForm';
import ReviewList from './components/ReviewList';
import './App.css';

function App() {
    return(
        <Router>
            <div>
                <h1>GameTracker</h1>
                <Routes>
                    <Route path='/' element={<GameLibrary />} />
                    <Route path='/add-game' element={<AddGameForm />} />
                    <Route path='/reviews' element={<ReviewList />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;