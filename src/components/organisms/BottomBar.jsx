import { useSuspenseQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import {
  CommandLineIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Shortcut from "../atoms/Shortcut";

function Button({ isActive, children, onClick }) {
  return (
    <button
      className={classNames(
        "flex flex-nowrap items-center gap-1 text-nowrap px-1.5 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-600",
        isActive && "!bg-blue-600 font-medium !text-white",
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
    <div className="flex h-6 w-full gap-1.5 border-t px-1.5 text-xs leading-6">
      <Button isActive={isCommandsActive} onClick={onCommandsClick}>
        <CommandLineIcon className="size-4" />
        Console
        <Shortcut text="c" />
      </Button>

      <div className="grow" />

      <Button>
        taskwarrior {taskwarriorVersionQuery.data.version} (
        {taskwarriorVersionQuery.data.binary_path})
      </Button>

      <Button>
        <QuestionMarkCircleIcon className="size-4" />
      </Button>
    </div>
  );
}
