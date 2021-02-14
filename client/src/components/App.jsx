import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./Header";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import SurveyNew from "./surveys/SurveyNew";
import * as actions from '../actions'

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        {/*exact can be exact={true} or just left as exact. es2016 evaluates them as the same*/}
                        <Header/>
                        <Route exact={true} path='/' component={Landing}/>
                        <Route exact path='/surveys' component={Dashboard}/>
                        <Route exact path='/surveys/new' component={SurveyNew}/>
                    </div>
                </BrowserRouter>

            </div>
        )
    }
};

export default connect(null, actions)(App);
