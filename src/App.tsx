import React from 'react';
import './App.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function App() {
  const [current, setCurrent] = React.useState('one');
  return (
    <div className="App">
       <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        One
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Two
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Three
      </Tab>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
