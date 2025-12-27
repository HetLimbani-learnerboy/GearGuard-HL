import React from "react";
import Loginpage from "./Component/Loginpage";
import SignUppage from "./Component/SignUppage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Loginpage />} />
            </Routes>
        </Router>
    );
};

export default App;
