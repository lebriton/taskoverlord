import Modal from "../molecules/Modal";
import Input from "../atoms/Input";
import Card, { CardHeader, CardBody } from "../molecules/Card";
import Heading3 from "../molecules/Heading3";
import classNames from "classnames";

export default function FloatingTerminal({ show, onClose }) {
  return (
    <Modal show={show} onClose={onClose}>
      <Card className="mb-6 shadow-lg">
        <CardBody>
          <Input
            className="!text-lg"
            placeholder="Type a taskwarrior command…"
            buttonText="Run"
            helpText="Only a subset of taskwarrior commands is supported."
          />
        </CardBody>
      </Card>

      <div className="flex flex-col divide-y divide-neutral-700 rounded-xl bg-neutral-950 text-sm text-neutral-50 shadow-lg">
        <TerminalBlock status={1} command="test" output="" />

        <TerminalBlock
          status={0}
          command="task help"
          output={`
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
        <div className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 w-full">
        <pre className="flex-1 font-medium">
          <span className="font-bold">$</span> {command}
        </pre>
      <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}
