import React, { useState, useEffect } from "react";
import "./App.scss";

interface SetupFormProps {
  callback: () => void;
}

const SetupForm = ({ callback }: SetupFormProps) => {
  const [handed, setHanded] = useState(0);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback();
  };

  useEffect(() => {
    setHanded(9);
  }, []);

  return (
    <div className="setup-form">
      <h1>Tournament Setup</h1>
      <form onSubmit={submitForm} className={"is-flex-column"}>
        <div>
          <label> Max hands per table: </label>
          <input
            type="number"
            value={handed}
            onChange={(e) => setHanded(parseInt(e.target.value))}
          />
        </div>
        <label> Players, separated by newlines: </label>
        <textarea />
        <button>Start Tournament</button>
      </form>
    </div>
  );
};

interface TableManagerProps {
  initialPlayers: string[];
}

const TableManager = ({ initialPlayers }: TableManagerProps) => (
  <>Table Manager will go here</>
);

function App() {
  enum State {
    SETUP,
    RUNNING,
  }

  const [state, setState] = useState(State.SETUP);

  const start = () => {
    setState(State.RUNNING);
  };

  return (
    <div className="App">
      {state === State.SETUP ? (
        <SetupForm callback={start} />
      ) : (
        <TableManager initialPlayers={[]} />
      )}
    </div>
  );
}

export default App;
