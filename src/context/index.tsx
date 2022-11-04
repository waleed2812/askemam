import React, { createContext, useContext, useMemo, useReducer } from "react";

// The Context main context
const MyContext = createContext<any | null>(null);

// Setting custom name for the context which is visible on react dev tools
MyContext.displayName = "MyContext";

// Context reducer
function reducer(state: any, action: any) {
  switch (action.type) {
    case "DARK_MODE": {
      localStorage.setItem("DARK_MODE", action.value);
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Context provider
export const ContextProvider: React.FC<any> = (props: any) => {
  const { children } = props;
  let darkMode = localStorage.getItem("DARK_MODE");
  if (!darkMode) {
    const res = window.matchMedia("(prefers-color-scheme: dark)").media;
    darkMode = res.includes("dark") + "";
  }
  const initialState = {
    darkMode: darkMode === "true",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Context custom hook for using context
export const useContextController = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error(
      "useContextController should be used inside the ContextProvider."
    );
  }

  return context;
};
