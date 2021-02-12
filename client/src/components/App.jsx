import React from 'react';
import Header from "./Header";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from "./Landing";
import SurveyNew from "./SurveyNew";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className="container">
                    {/*exact can be exact={true} or just left as exact. es2016 evaluates them as the same*/}
                    <Header />
                    <Route exact={true} path='/' component={Landing} />
                    <Route exact path='/surveys' component={Dashboard} />
                    <Route exact path='/surveys/new' component={SurveyNew} />
                </div>
            </BrowserRouter>

        </div>
    )
};

export default App;
