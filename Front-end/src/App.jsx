import React from "react";
import SignUppage from "./Component/SignUppage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUppage />} />
            </Routes>
        </Router>
    );
};

export default App;
