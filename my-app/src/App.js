//import logo from './logo.svg';
import logo from './word_logo.svg';
import './App.css';
import { MuseClient, channelNames } from 'muse-js';
import { Observable } from "rxjs";

async function main() {

  //interface EEGReading {
  //  electrode: number;
  //  timestamp: number;
  //  samples: number[]; // array of 12 floats containing EEG measurements in mV
  //}
  this.muse = new MuseClient();
  // init connection w headset
  await this.muse.connect();
  // commands headset to start sampling data and sending down wire
  await this.muse.start();
  // subscribe to EEG DATA
  const leftEyeChannel = channelNames.indexOf('AF7');
  
  // get max val of each packet
  this.leftWinks = this.muse.eegReadings
  .filter(r => r.electrode === leftEyeChannel)
  .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
  // filter for values > 500 mV (blinks)
  .filter(max => max > 500)
  // when new stream exists, abandon previous stream, call func on new stream
  .switchMap(() =>
    Observable.merge(
    Observable.of(1),
    Observable.timer(500).map(() => 0)
    )
  );
  // subscribe to blinks and start simple console log
  this.leftWinks.subscribe(value => {
    console.log('Left wink!', value);
  });

  // subscribe to EEG DATA
  const rightEyeChannel = channelNames.indexOf('AF8');
  
  this.rightWinks = this.muse.eegReadings
  .filter(r => r.electrode === rightEyeChannel)
  .map(r => Math.max(...r.samples.map(n => Math.abs(n))))
  // filter for values > 500 mV (blinks)
  .filter(max => max > 500)
  // when new stream exists, abandon previous stream, call func on new stream
  .switchMap(() =>
    Observable.merge(
    Observable.of(1),
    Observable.timer(500).map(() => 0)
    )
  );

  // subscribe to blinks and start simple console log
  this.rightWinks.subscribe(value => {
    console.log('Right wink!', value);
  });

  this.leftBlinks.subscribe(value => {
    this.setState({left: value});
  });

  this.rightBlinks.subscribe(value => {
    this.setState({right: value});
  });
}

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

main();
