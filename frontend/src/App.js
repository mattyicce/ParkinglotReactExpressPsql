import './App.css';
import { Lot } from './Lot.js';
import { AddCar } from './AddCar'

function App() {
  return (
    <div className="App">
      Car lot
      <Lot />
      <AddCar />
    </div>
  );
}

export default App;
