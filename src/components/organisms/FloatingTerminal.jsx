import Modal from "../molecules/Modal";
import Input from "../atoms/Input";
import Card, { CardBody, CardHeader } from "../molecules/Card";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../atoms/Button";
import FlexLine from "../molecules/FlexLine";
import { useEffect, useRef } from "react";

export default function FloatingTerminal({ show, onClose }) {
  const inputReference = useRef(null);

  useEffect(() => {
    if (show) {
      inputReference.current.focus();
      inputReference.current.value = "";
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
            ref={inputReference}
            className="!text-lg"
            placeholder="Type a taskwarrior command…"
            buttonText="Run"
            helpText="Only a subset of taskwarrior commands is supported."
          />
        </CardBody>
      </Card>

      <div className="flex flex-col divide-y divide-neutral-700 rounded-xl border border-neutral-700 bg-neutral-950 text-sm text-neutral-50 shadow-lg">
        <TerminalBlock status={1} command="test" stdout="" />

        <TerminalBlock
          status={0}
          command="task help"
          stdout={`
Usage: task                                                   Runs rc.default.command, if specified.
       task <filter> active                                   Active tasks
       task          add <mods>                               Adds a new task
       task <filter> all                                      All tasks
       task <filter> annotate <mods>                          Adds an annotation to an existing task
       task <filter> append <mods>                            Appends text to an existing task description
       task <filter> blocked                                  Blocked tasks
       task <filter> blocking                                 Blocking tasks`}
        />
      </div>
    </Modal>
  );
}

function TerminalBlock({ status, command, stdout }) {
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
          <pre className="flex-1 font-medium">
            <span className="font-bold">$</span> {command}
          </pre>
          <pre>{stdout}</pre>
        </div>
      </div>
    </div>
  );
}
