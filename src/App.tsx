import React, { useState, useEffect } from "react";
import "./App.scss";

interface TableManagerProps {
  handed: number;
  initialPlayers: string[];
}

const TableManager = ({ handed, initialPlayers }: TableManagerProps) => <></>;

interface SetupFormProps {
  callback: (handed: number, players: string[]) => void;
}

const SetupForm = ({ callback }: SetupFormProps) => {
  const [handed, setHanded] = useState(0);
  const [players, setPlayers] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(handed, players.split("\n"));
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
        <textarea
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
        <button>Start Tournament</button>
      </form>
    </div>
  );
};

function App() {
  enum State {
    SETUP,
    RUNNING,
  }

  const [state, setState] = useState(State.SETUP);
  const [handed, setHanded] = useState(9);
  const [players, setPlayers] = useState<string[]>([]);

  const start = (handed: number, players: string[]) => {
    setHanded(handed);
    setPlayers(players);
    setState(State.RUNNING);
  };

  return (
    <div className="App">
      {state === State.SETUP ? (
        <SetupForm callback={start} />
      ) : (
        <TableManager handed={handed} initialPlayers={players} />
      )}
    </div>
  );
}

export default App;
