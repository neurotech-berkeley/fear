import logo from './logo.svg';
//import logo from './NTB Blue Wordmark White.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link href="https://cdn.jsdelivr.net/npm/@chartshq/muze@2.0.0/dist/muze.css" rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/@chartshq/muze@2.0.0/dist/muze.js" type="text/javascript"></script>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Neurotech Fa'22 Infosession Demo!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
