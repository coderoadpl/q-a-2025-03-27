import { useMemoryGameStore } from "./storeToReactAdapter";

const App = () => {
  const count = useMemoryGameStore((state) => state.count)
  const setCount = useMemoryGameStore((state) => state.setCount)

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default App;
