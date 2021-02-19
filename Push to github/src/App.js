import React from 'react';
//import './App.scss';
import {Button} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import myLocationWeather from './components/MyLocationWeather'
import AnyLocation from './components/AnyLocation'

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
      
//     }
//     render(){

//     }
//   }

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={myLocationWeather} />
        <Route exact path="/anylocation" component={AnyLocation} />
        
      </div>
    </Router>
  );
}



export default App;