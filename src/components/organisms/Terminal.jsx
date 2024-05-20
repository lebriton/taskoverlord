import Modal from "../molecules/Modal";
import Input from "../atoms/Input";
import Card, { CardBody, CardFooter, CardHeader } from "../molecules/Card";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../atoms/Button";
import FlexLine from "../molecules/FlexLine";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function Terminal({ show, onClose }) {
  const inputReference = useRef(null);

  const [commandLineValue, setCommandLineValue] = useState("");
  const [history, setHistory] = useState([]);

  const tauriMutation = useMutation({
    mutationFn: () =>
      invoke("run_shell_command", { commandString: commandLineValue }),
    onSettled: (data, error) => {
      setHistory([
        ...history,
        {
          time: getCurrentTime(),
          command: commandLineValue,
          output: data ? data.lines : error,
          status: data ? data.returncode : -1,
        },
      ]);
      setCommandLineValue("");
    },
  });

  const handleSubmit = () => {
    tauriMutation.mutate();
  };

  useEffect(() => {
    if (show) {
      inputReference.current.focus();
      setCommandLineValue("");
    }
  }, [show]);

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <Card className="h-full max-h-full overflow-clip" hasExternalBorder={false}>
      <CardBody className="flex flex-col divide-y divide-neutral-700 overflow-auto bg-neutral-950 !p-0 text-sm text-neutral-50">
        {history.map((entry, idx) => (
          <TerminalBlock
            key={idx}
            time={entry.time}
            status={entry.status}
            command={entry.command}
            output={entry.output}
          />
        ))}
        <div ref={bottomRef} />
      </CardBody>

      <CardFooter>
        <Input
          className="font-mono"
          value={commandLineValue}
          placeholder="Type a taskwarrior command…"
          buttonChildren={tauriMutation.isPending ? "Running…" : "Run"}
          isLoading={tauriMutation.isPending}
          onChange={(e) => setCommandLineValue(e.target.value)}
          onSubmit={handleSubmit}
          ref={inputReference}
        />
      </CardFooter>
    </Card>
  );
}

function TerminalBlock({ time, status, command, output }) {
  return (
    <div className="flex items-baseline gap-3 p-3">
      <div
        className={classNames(
          "size-1.5 shrink-0 rounded-full ring-2",
          status == 0 && "bg-green-600/75 ring-green-700/50",
          status != 0 && "bg-red-600/75 ring-red-700/50",
        )}
      />
      <pre className="grow overflow-auto">
        $ {command}
        {"\n"}
        {output}
      </pre>
      <span className="shrink-0 text-xs text-neutral-400">{time}</span>
    </div>
  );
}
