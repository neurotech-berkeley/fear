//import logo from './logo.svg';
import logo from './word_logo.svg';
import './App.css';
import { MuseClient, channelNames } from 'muse-js';
import { filter, map } from "rxjs/operators";

function App() {

  var muse = null;
  var eeg_source$ = null;
  var left_wink$ = null;
  var right_wink$ = null;

  function build_wink(source, chan_ind) {
    return source.pipe(
      filter((r) => r.electrode === chan_ind),
      map((r) => Math.max(...r.samples.map((n) => Math.abs(n)))),
      // filter for values > 500 mV (blinks)
      filter((max) => max > 500),
      // when new stream exists, abandon previous stream, call func on new stream
    );
  }

  async function main() {

    //interface EEGReading {
    //  electrode: number;
    //  timestamp: number;
    //  samples: number[]; // array of 12 floats containing EEG measurements in mV
    //}
    muse = new MuseClient();
    try {
      // init connection w headset
      await muse.connect();
      // commands headset to start sampling data and sending down wire
      await muse.start();
      eeg_source$ = muse.eegReadings;
    } catch (err) {
      console.error('ERROR: FAILED CONNECTION', err);
    }
    left_wink$ = build_wink(eeg_source$, channelNames.indexOf('AF7'));
    left_wink$.subscribe((value) => {
      console.log('left wink', value);
    });

    right_wink$ = build_wink(eeg_source$, channelNames.indexOf('AF8'));
    right_wink$.subscribe((value) => {
      console.log('right wink', value);
    });
    // DEBUG
    /**
    eeg_source$.subscribe((element) => {
      console.log('packet', element);
    });
    **/
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Neurotech@Berkeley Fall '22 Infosession Demo: EEG Wink
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
      <button onClick={main}>
        Connect!
      </button>
    </div>
  );
}
export default App;