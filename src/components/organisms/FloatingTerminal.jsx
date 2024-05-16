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
    <div className="px-8 py-6">
      <div className="flex items-center gap-8">
        <div
          className={classNames(
            "size-2.5 rounded-full",
            status == 0 && "bg-green-500/85 ring-4 ring-green-500/50",
            status != 0 && "bg-red-500/85 ring-4 ring-red-500/50",
          )}
        />
        <pre className="flex-1 font-medium">
          <span className="font-bold">$</span> {command}
        </pre>
        <span className="text-xs font-medium tracking-wide opacity-50">
          23:57:39
        </span>
      </div>
      <pre className="ml-10 ps-0.5">{output}</pre>
    </div>
  );
}
