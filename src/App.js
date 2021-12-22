import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Join />}/>
                <Route path='/chat' exact element={<Chat />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;