import "./SplashHeader.scss";
import React, { useState, useEffect } from "react";

export default function SplashHeader() {
  const [state, setState] = useState({
    class: "active",
    value: "talked about.",
  });

  useEffect(() => {
    const initialState = {
      class: "active",
      value: "talked about.",

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
    if (state.class === "going" && state.value === "talked about.") {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "online.",
        }));
      }, 2002);
    }
    if (state.class === "going" && state.value === "online.") {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "intriguing.",
        }));
      }, 2002);
    }
    if (state.class === "going" && state.value === "intriguing.") {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "here.",
        }));
      }, 2002);
    }
    if (state.class === "going" && state.value === "here.") {
      setTimeout(() => {
        setState((state) => ({
          class: "coming",
          value: "talked about.",
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
