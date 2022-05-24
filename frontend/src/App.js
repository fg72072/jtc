import { useState } from 'react';
import './App.css';
import Header from './component/Header';
// import Home from './components/Home';
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';
import logo from './logo.svg';
import './assets/css/style.css';
import './assets/css/responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fontawesome/css/all.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { Home,PublicSale,PrivateSale } from './screen';

function App() {
  const [errorMessage, setErrorMessage] = useState();
  useEagerConnect(setErrorMessage);
  useInactiveListener();

  return (
    <Router>


    <Routes>
 
      
      <Route path="/" element={<Home/>} />
      <Route path="/public-sale" element={<PublicSale/>} />
      <Route path="/private-sale" element={<PrivateSale/>} />
      

    </Routes>
    
  </Router>
    // <div className="App">
    //   {
    //     errorMessage? <div style={{color:"red"}}>{errorMessage}</div>: null
    //   }
    //   <Header setErrorMessage={setErrorMessage}/>
    //   <Home />
    // </div>
  );
}

export default App;
