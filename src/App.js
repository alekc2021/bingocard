import React, { useEffect, useState } from "react";
import background from "./assets/background.png";
import Number from "./Number";
import "./App.css";

const ranges = [
  { min: 1, max: 15 },
  { min: 16, max: 30 },
  { min: 31, max: 45 },
  { min: 46, max: 60 },
  { min: 61, max: 75 },
];

const secretArray = [
  [2, 4, 1, 3, 0],
  [0, 1, 3, 4, 2],
  [1, 2, 4, 0, 3],
  [4, 3, 0, 3, 1],
  [3, 2, 0, 1, 4]
]

const getRestNum = (value) => value < 30 ? (value >= 15 ? value - 15 : value) : value - 30

const generateCode = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log('letter code ---> ' + result)
  return result;
}

const generateNumbers = () => {
  const bingoNums = [];
  ranges.forEach((range) => {
    const result = [];
    const available = [];
    const { min, max } = range;
    for (let i = min; i < max + 1; i++) {
      available.push(i);
    }
    const totalLength = max - min + 1;
    for (let i = 0; i < 5; i++) {
      while (true) {
        const random = available[Math.floor(Math.random() * totalLength)];
        if (result.indexOf(random) === -1) {
          result.push(random);
          break;
        }
      }
    }
    bingoNums.push(result);
  });
  return bingoNums;
};

const generateIndex = (arr, secret) => {
  const getIndex = (index) => index >= 5 ? index -5 : index
  const data = arr[secret]
    + arr[getIndex(secret + 1)] - arr[getIndex(secret + 3)]
    + arr[getIndex(secret + 2)] - arr[getIndex(secret + 4)]
  return Math.abs(data) % 15
}

const generateNumbersFromCode = (code) => {

  const codeNumbers = []
  for (let i = 0; i < code.length; i ++) {
    let data = getRestNum(parseInt(code[i], 36))
    while (true) {
      if (codeNumbers.indexOf(getRestNum(data)) === -1) {
        codeNumbers.push(getRestNum(data));
        break;
      } else {
        data += i + 2;
      }
    }
  }
  console.log(codeNumbers)
  const bingoNums = [];
  ranges.forEach((range, index) => {
    const result = [];
    const available = [];
    const { min, max } = range;
    for (let i = min; i < max + 1; i++) {
      available.push(i);
    }
    for (let i = 0; i < 5; i++) {
      let random;
      let initialIndex = generateIndex(codeNumbers, secretArray[index][i]);
      random = available[initialIndex];
      while (true) {
        if (result.indexOf(random) === -1 ) {
          result.push(random);
          break;
        } else {
          initialIndex += i;
          random = available[getRestNum(initialIndex)]
        }
      }
    }
    bingoNums.push(result);
  });
  console.log(bingoNums)
  return bingoNums;
};

function App() {
  const [numbers, setNumbers] = useState([]);
  const [textCode, setTextCode] = useState('');
  const generateBingo = () => {
    setNumbers(generateNumbersFromCode(textCode));
  }

  const generateAutoBingo = () => {
    const autoCode = generateCode(5);
    setTextCode(autoCode);
    setNumbers(generateNumbersFromCode(autoCode));
  }
  useEffect(() => {
    setTimeout(() => {
      setNumbers(generateNumbersFromCode(generateCode(5)));
      //generateNumbersFromCode(generateCode(5))
    }, 500);
  }, []);
  return (
    <div className="App">
      <img src={background} className="App-background" alt="background" />
      <div className="grid-wrapper">
      <div className="text-input">
        <input
          type="text" 
          value={textCode}
          maxLength={5}
          placeholder='Type 5 length string here'
          onChange={(e) => setTextCode(e.target.value)}
        />
        <button onClick={()=> generateBingo()} disabled ={textCode.length !== 5}>
          Generate Bingo
        </button>
        <button onClick={()=> generateAutoBingo()} >
          Auto Generate
        </button>
      </div>
        <div className="grid">
          {numbers.map((numArr, index) => (
            <div className="col" key={index}>
              {numArr.map((num, itemIndex) => (
                <Number
                  key={num}
                  number={index === 2 && itemIndex === 2 ? "" : num}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
