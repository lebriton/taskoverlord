import * as React from "react";

interface GlobalStateType {
  selectedTaskUuid: string | null;
  selectTask: (uuid: string | null) => void;
}

export const GlobalState = React.createContext<GlobalStateType | null>(null);

const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTaskUuid, setSelectedTaskUuid] = React.useState<string | null>(null);

  return (
    <GlobalState.Provider
      value={{
        selectedTaskUuid,
        selectTask: (uuid: string | null) => setSelectedTaskUuid(uuid),
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalStateProvider;

export const useGlobalState = (): GlobalStateType => {
  const context = React.useContext(GlobalState);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
