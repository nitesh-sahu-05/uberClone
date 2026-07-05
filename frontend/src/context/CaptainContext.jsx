/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const CaptainContext = createContext(null);

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  const loginCaptain = (data) => {
    setCaptain(data);
  };

  const logoutCaptain = () => {
    setCaptain(null);
  };

  const value = useMemo(
    () => ({ captain, setCaptain: loginCaptain, logoutCaptain }),
    [captain]
  );

  return (
    <CaptainContext.Provider value={value}>
      {children}
    </CaptainContext.Provider>
  );
};

export const useCaptain = () => {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }
  return context;
};

export default CaptainContext;
