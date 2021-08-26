import './App.css';
import Board from './components/Board/Board';

function App() {
  return (
    <div className='App'>
      <Board width={15} height={15}></Board>
    </div>
  );
}

export default App;
