import React, { useState } from 'react';
import Users from './Users';
import './App.css';

function App() {
  const [state, setState] = useState('');

  const handleChange = (e) => {
      setState(e.target.value);
  };
  return (
    <>
      <header style={{backgroundImage: "url(/images/backgroundimg.jpg)"}}>
          <div className="topbar">
              <a href="#top"><button className="menubutton"><img src={'/images/list.png'} alt="" style={{height: 30}}/></button></a>
              <input type="text" onChange={handleChange}/>
              <a href="#top"><button className="loginbutton">LOGIN</button></a>
          </div>
          <div className='Matjip'>
              <h1 className='txt'>맛집</h1>
              <h2 className='txt'>MATJIP</h2>
          </div>
      </header>
      <Users matjip={state.text}/>
    </>
  );
}

export default App;