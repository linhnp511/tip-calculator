import { useState } from "react";
import "./App.css";

const ratings = [
  {
    level: "Dissatisfied",
    perc: 0,
  },
  {
    level: "It was okay",
    perc: 5,
  },
  {
    level: "It was good",
    perc: 10,
  },
  {
    level: "Absolutely amazing!",
    perc: 20,
  },
];

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [billValue, setBillValue] = useState("");
  const [myPerc, setMyPerc] = useState(0);
  const [yourPerc, setYourPerc] = useState(0);
  const tip = Math.round(((myPerc + yourPerc) / 100 / 2) * billValue);
  const totalBill = billValue + tip;
  function handleReset() {
    setBillValue("");
    setMyPerc(0);
    setYourPerc(0);
  }
  return (
    <div>
      <BillInput billVal={billValue} onBillVal={setBillValue} />
      <SelectPercentage object="you" percentage={myPerc} onPerc={setMyPerc} />
      <SelectPercentage
        object="your friend"
        percentage={yourPerc}
        onPerc={setYourPerc}
      />
      {billValue > 0 && (
        <>
          <Output billVal={billValue} tip={tip} totalBill={totalBill} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}
function BillInput({ billVal, onBillVal }) {
  return (
    <div>
      <form>
        <label>How much was the bill? </label>
        <input
          type="number"
          placeholder="Bill value"
          value={billVal}
          onChange={(e) => onBillVal(Number(e.target.value))}
        ></input>
      </form>
    </div>
  );
}
function SelectPercentage({ object, percentage, onPerc }) {
  return (
    <div>
      <label>How did {object} like the service?</label>
      <select
        value={percentage}
        onChange={(e) => onPerc(Number(e.target.value))}
      >
        {ratings.map((rating) => (
          <option
            value={rating.perc}
          >{`${rating.level} (${rating.perc}%)`}</option>
        ))}
      </select>
    </div>
  );
}
function Output({ billVal, totalBill, tip }) {
  return <h1>{`You pay $${totalBill} ($${billVal}+$${tip}) tip`}</h1>;
}
function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
