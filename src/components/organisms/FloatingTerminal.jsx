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
    // NB: 200 = .15s (the grow-y animation time) + a small amount (.05s)
    const timer = setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      200,
    );
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <Modal show={show} onClose={onClose}>
      <Card className="shrink-0 shadow-lg">
        <CardHeader className="bg-neutral-50">
          <FlexLine
            right={
              <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
            }
          />
        </CardHeader>

        <CardBody className="!p-0">
          {history.length > 0 && (
            <div className="flex flex-col divide-y divide-neutral-700 overflow-auto bg-neutral-950 text-sm text-neutral-50">
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
            </div>
          )}
        </CardBody>

        <CardFooter>
          <Input
            size="md"
            value={commandLineValue}
            placeholder="Type a taskwarrior command…"
            buttonChildren={tauriMutation.isPending ? "Running…" : "Run"}
            helpText="Only a subset of taskwarrior commands is supported."
            isLoading={tauriMutation.isPending}
            onChange={(e) => setCommandLineValue(e.target.value)}
            onSubmit={handleSubmit}
            ref={inputReference}
          />
        </CardFooter>
      </Card>
    </Modal>
  );
}

function TerminalBlock({ time, status, command, output }) {
  return (
    <div className="grid animate-grow-y">
      <div className="overflow-hidden">
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
      </div>
    </div>
  );
}
