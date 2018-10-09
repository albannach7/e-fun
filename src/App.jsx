import React, { Component } from 'react';
import { HeaderComponent } from './components/HeaderComponent.jsx';
import './App.css';
import {TableComponent} from "./components/TableComponent";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ResultComponent} from "./components/ResultComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
		  <HeaderComponent />
          <Router>
              <div className="main-content">
    			  <Route exact path="/" component={TableComponent} />
	    		  <Route path="/result/:id" component={ResultComponent} />
              </div>
          </Router>
          <footer>
            Iris Winter
          </footer>
      </div>
    );
  }
}

export default App;
