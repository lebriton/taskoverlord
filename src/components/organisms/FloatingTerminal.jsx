import Modal from "../molecules/Modal";
import Input from "../atoms/Input";
import Card, { CardBody, CardHeader } from "../molecules/Card";
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

export default function FloatingTerminal({ show, onClose }) {
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
          output: data?.lines || error,
          status: data?.returncode || -1,
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

  return (
    <Modal show={show} onClose={onClose}>
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-neutral-50">
          <FlexLine
            left={<span className="text-neutral-400">Commands</span>}
            right={
              <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
            }
          />
        </CardHeader>

        <CardBody>
          <Input
            size="lg"
            value={commandLineValue}
            placeholder="Type a taskwarrior command…"
            buttonChildren={tauriMutation.isPending ? "Running…" : "Run"}
            helpText="Only a subset of taskwarrior commands is supported."
            isLoading={tauriMutation.isPending}
            onChange={(e) => setCommandLineValue(e.target.value)}
            onSubmit={handleSubmit}
            ref={inputReference}
          />
        </CardBody>
      </Card>

      {history.length > 0 && (
        <div className="flex flex-col divide-y divide-neutral-700 overflow-clip rounded-xl border border-neutral-700  text-sm text-neutral-50 shadow-lg">
          {history
            .slice(0)
            .reverse()
            .map((entry, idx) => (
              <TerminalBlock
                key={history.length - 1 - idx}
                time={entry.time}
                status={entry.status}
                command={entry.command}
                output={entry.output}
              />
            ))}
        </div>
      )}
    </Modal>
  );
}

function TerminalBlock({ time, status, command, output }) {
  return (
    <div className="animate-fade-in bg-neutral-950 p-6">
      <div className="flex items-baseline gap-6">
        <span className="shrink-0 font-medium tracking-wide text-neutral-300">
          {time}
        </span>
        <div
          className={classNames(
            "size-2 shrink-0 rounded-full ring-4",
            status == 0 && "bg-green-500/85 ring-green-500/50",
            status != 0 && "bg-red-500/85 ring-red-500/50",
          )}
        />
        <div className="grow overflow-auto rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5">
          <pre className="overflow-auto">
            $ {command}
            {"\n"}
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
