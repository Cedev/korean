import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSignal } from "./hooks.js"
import { Speak } from "./Speak.js";
import { History } from "./history.js";
import wordlist from './wordlist.json';
import Hammer from 'hammerjs';
import { BigText } from './BigText';

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  const sat = Math.floor(Math.pow(Math.random(), 0.5) * 100);  
  const lum = Math.floor(Math.random() * (80 - 37) + 37);

  return "hsl(" + hue + ", " + sat + "%, " + lum + "%)";
}

function App() {
  var [takeSignal, setSignal] = useSignal();
  var [history, setHistory] = useState(() => new History());
  var [value, setValue] = useState(undefined);

  const generator = () => ({
    lang: "ko-KR",
    text: wordlist[Math.floor(Math.random() * wordlist.length)],
    color: randomColor()});
  console.log(history);

  const speak = () => setSignal({});

  useEffect(() => {
    var mc = new Hammer.Manager(document, {
      recognizers: [
        [Hammer.Tap, { taps: 1, threshold: 3, posThreshold: 25 }],
        [Hammer.Swipe]
      ],
      touchAction: 'none'
    });

    mc.on('tap', speak);
    mc.on('swipeleft', () => setValue(history.next(generator)));
    mc.on('swiperight', () => setValue(history.prev()));
  }, []);
  
  if (value) {
    return (
      <div className="App">
        <BigText style={{background: value?.color}} className="App-Prompt App-Card">{value?.text}</BigText>
        <Speak signal={takeSignal} lang={value?.lang} pitch="0" >{value?.text}</Speak>
      </div>
    );
  }
  
  return (
    <div className="App">
      <div className='App-Card App-Instructions'>
        <ul>
          <li>Swipe left to go to the next card.</li>
          <li>Tap to play the text out loud.</li>
          <li>Swipe right to go back to previous cards.</li>
        </ul>
      </div>
    </div>
  )
}

export default App;
