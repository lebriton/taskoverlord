import { getTasks } from "@/lib/ipc";
import { Task, TaskGroup } from "@/lib/types/task";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import * as React from "react";

interface GlobalStateType {
  tasksQuery: UseQueryResult<Task[], Error>;
  groupedTasks: TaskGroup[];
  selectedTaskUuid: string | null;
  selectTask: (uuid: string | null) => void;
}

export const GlobalState = React.createContext<GlobalStateType | null>(null);

const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tasksQuery = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  // TODO:
  const groupedTasks = [
    { name: "Ungrouped", tasks: tasksQuery.data || [] },
    { name: "Ungrouped", tasks: tasksQuery.data || [] },
  ];

  const [selectedTaskUuid, setSelectedTaskUuid] = React.useState<string | null>(null);

  return (
    <GlobalState.Provider
      value={{
        tasksQuery,
        groupedTasks,
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
