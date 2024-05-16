import { useSuspenseQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Shortcut from "../atoms/Shortcut";

function Button({ isActive, children, onClick }) {
  return (
    <button
      className={classNames(
        "flex items-center gap-1 px-1.5 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-600",
        isActive && "!bg-neutral-200 !text-neutral-600",
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function BottomBar({ isCommandsActive, onCommandsClick }) {
  const taskwarriorVersionQuery = useSuspenseQuery({
    queryKey: ["taskwarrior", "info"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_taskwarrior_info"),
  });

  return (
    <div className="flex h-6 w-full gap-1.5 border-t bg-neutral-50 px-1.5 text-xs leading-6">
      <Button>taskwarrior {taskwarriorVersionQuery.data.version}</Button>
      <Button>binary: {taskwarriorVersionQuery.data.binary_path}</Button>

      <div className="flex-1" />

      {/* TODO: onClick: show CHANGELOG */}
      {/* TODO: get the version from somewhere */}
      <Button isActive={isCommandsActive} onClick={onCommandsClick}>
        <CommandLineIcon className="size-4" />
        Commands
        <Shortcut text="c"/>
      </Button>
      <Button>Taskoverlord v0.1.0</Button>
    </div>
  );
}
