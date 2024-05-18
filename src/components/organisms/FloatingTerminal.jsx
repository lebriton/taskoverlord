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

export default function FloatingTerminal({ show, onClose }) {
  const inputReference = useRef(null);

  const [commandLineValue, setCommandLineValue] = useState("");
  const [history, setHistory] = useState([]);

  const tauriMutation = useMutation({
    mutationFn: () => {
      return invoke("run_shell_command", { commandString: commandLineValue });
    },
    onSuccess: (command_output) => {
      console.log(command_output);
      setHistory([
        ...history,
        {
          command: commandLineValue,
          output: command_output.lines,
          status: command_output.returncode,
        },
      ]);
      setCommandLineValue("");
    },
    onError: (e) => console.log(e),
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
            buttonChildren={tauriMutation.isFetching ? "Running…" : "Run"}
            helpText="Only a subset of taskwarrior commands is supported."
            isLoading={tauriMutation.isFetching}
            onChange={(e) => setCommandLineValue(e.target.value)}
            onSubmit={handleSubmit}
            ref={inputReference}
          />
        </CardBody>
      </Card>

      {history.length > 0 && (
        <div className="flex flex-col-reverse divide-y divide-neutral-700 rounded-xl border border-neutral-700 bg-neutral-950 text-sm text-neutral-50 shadow-lg">
          {history.map((entry, idx) => (
            <TerminalBlock
              key={idx}
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

function TerminalBlock({ status, command, output }) {
  return (
    <div className="p-6">
      <div className="flex items-baseline gap-6">
        <span className="font-medium tracking-wide text-neutral-300">
          23:57:39
        </span>
        <div
          className={classNames(
            "size-2 rounded-full ring-4",
            status == 0 && "bg-green-500/85 ring-green-500/50",
            status != 0 && "bg-red-500/85 ring-red-500/50",
          )}
        />
        <div className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5">
          <pre>$ {command}</pre>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}
