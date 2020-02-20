import React, { useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import "./styles.css";

/**
    Сделай так, чтобы в приложении все классы заменились на функциональные компоненты, для этого используй Hooks

    Импортировать нужные хуки можно так:
        import React, { useState } from "react";

    Список хуков, которые могут пригодиться: useState, useRef, useEffect
 */

function App() {
  const [lastBlockId, setLastBlockId] = setState(0);
  constructor(props) {
    super(props);
    this.lastBlockId = 0;
    this.state = {
      blockIds: []
    };
  }

  addNew = () => {
    this.lastBlockId++;
    this.setState({
      blockIds: [...this.state.blockIds, this.lastBlockId]
    });
  };

  removeLast = () => {
    this.setState({
      blockIds: this.state.blockIds.slice(0, this.state.blockIds.length - 1)
    });
  };

  render() {
    return (
      <div className="page">
        <div className="controlPanel">
          <button
            type="button"
            onClick={this.removeLast}
            className="actionButton"
          >
            -
          </button>
          <button type="button" onClick={this.addNew} className="actionButton">
            +
          </button>
        </div>
        <div className="container">
          {this.state.blockIds.map(blockId => (
            <CounterBlock key={blockId} />
          ))}
        </div>
      </div>
    );
  }
}

function CounterBlock() {
  const [value, setValue] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setValue(value + 1);
    }, 1000);

    return () => {
      clearInterval(this.timer);
    }
  }, []);

  return <div className="block">{value}</div>;
}

ReactDom.render(<App />, document.getElementById("app"));
