import "./SplashHeader.scss";
import React, { useState, useEffect } from "react";

export default function SplashHeader() {
  const [state, setState] = useState({
    class: "active",
    value: "talked about.",
    counter: 0,
  });

  useEffect(() => {
    const initialState = {
      class: "active",
      value: "talked about.",
      counter: 0,
    };
    if (state.class === "coming") {
      setTimeout(() => {
        setState((state) => ({ ...state, class: "active" }));
      }, 1000);
    }
    if (state.class === "active") {
      setTimeout(() => {
        setState((state) => ({ ...state, class: "going" }));
      }, 3000);
    }
    if (state.class === "going") {
      const count = state.counter + 1;
      setTimeout(() => {
        setState((state) => ({ ...state, class: "coming", counter: count }));
      }, 2002);
    }
    if (state.class === "going" && state.counter === 0) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "online.",
          counter: 1
        }));
      }, 2002);
    }
    if (state.class === "going" && state.counter === 1) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "intriguing.",
          counter: 2
        }));
      }, 2002);
    }
    if (state.class === "going" && state.counter === 2) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "here.",
          counter: 3
        }));
      }, 2002);
    }
    if (state.class === "going" && state.counter === 3) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "talked about.",
          counter: 0
        }));
      }, 2002);
    }
  }, [state]);

  return (
    <div className="home-intro-heading">
      <div className="title-line-left">
        <div className="word-holder">Good games are...</div>
      </div>
      <div className="title-line-right">
        <div className={`word-holder ${state.class}`}> {state.value} </div>
      </div>
    </div>
  );
}
