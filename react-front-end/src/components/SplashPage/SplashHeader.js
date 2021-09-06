import "./SplashHeader.scss";
import React, { useState, useEffect } from "react";

export default function SplashHeader() {
  const [state, setState] = useState({
    class: "active",
    value: "talked about.",
    counter: 0,
  });

  useEffect(() => {
    if (state.class === "coming") {
      setTimeout(() => {
        setState((state) => ({ ...state, class: "active" }));
      }, 2000);
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
      }, 2000);
    }
    if (state.class === "going" && state.counter === 0) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "online.",
          counter: 1,
        }));
      }, 2000);
    }
    if (state.class === "going" && state.counter === 1) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          counter: 2,
          value: "intriguing.",
        }));
      }, 2000);
    }
    if (state.class === "going" && state.counter === 2) {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          counter: 3,
          value: "here",
        }));
      }, 2000);
    }
    if (state.class === "going" && state.counter === 3) {
      setTimeout(() => {
        setState((state) => ({
          value: "talked about.",
          class: "coming",
          counter: 0,
        }));
      }, 2000);
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
