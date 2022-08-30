//import logo from './logo.svg';
import logo from './word_logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Neurotech@Berkeley Fall '22 Infosession Demo
        </p>
        <a
          className="App-link"
          href="https://neurotech.berkeley.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Neurotech Website
        </a>
      </header>
    </div>
  );
}

export default App;
