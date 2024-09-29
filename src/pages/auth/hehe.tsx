import { useState } from 'react';

export function MyComponent() {
  const [counter, setCounter] = useState(42);
  const [clicked, setClicked] = useState(0);

  const handleCounterIncrease = async () => {
    setCounter(counter + 1);
    await Promise.resolve();
    setClicked(clicked + 1);
  };

  console.log('component rendering');

  return (
    <div>
      <button type='button' onClick={handleCounterIncrease}>
        Increase2
      </button>
      <button type='button' onClick={handleCounterIncrease}>
        Decrease2
      </button>

      <div>Counter: {counter}</div>
      <div>Clicked: {clicked}</div>
    </div>
  );
}
