import React from 'react';
import Header from "./Header";
import SurveyList from "./SurveyList";
import Dashboard from "./Dashboard";


const App = () => {
    return (
        <div>
            <Dashboard/>
            <Header/>
            <SurveyList/>
        </div>
    )
};

export default App;