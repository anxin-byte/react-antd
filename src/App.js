import React from "react"
// import logo from './logo.svg';
import './App.scss';
import "./views/aaa.scss"
import {Switch,Route,HashRouter} from "react-router-dom"
import Home from "./views/Home"
import About from "./views/About"

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
        <div className="test">
            <p>6666</p>
            <ul>
                <li>0000n</li>
            </ul>
            <HashRouter>
                <Switch>
                    <Route exact component={Home} path="/"/>
                    <Route component={About} path="/about"/>
                </Switch>
            </HashRouter>
        </div>

        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo"/>
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //         className="App-link"
        //         href="https://reactjs.org"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //     >
        // {/*      Learn React*/}
        // {/*    </a>*/}
        // {/*  </header>*/}
        // {/*</div>*/}
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
