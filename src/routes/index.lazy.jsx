import { createLazyFileRoute } from "@tanstack/react-router";
import TasksTable from "../components/organisms/TasksTable";
import { getRealTaskStatus } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import Heading3 from "../components/molecules/Heading3";
import FlexLine from "../components/templates/FlexLine";
import Button from "../components/atoms/Button";
import { FunnelIcon } from "@heroicons/react/24/outline";
import Badge, { BadgeList } from "../components/atoms/Badge";
import Card, { CardBody } from "../components/molecules/Card";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
    initialData: [],
  });

  return (
    <div className="px-5">
      <Card>
        <CardBody>
          <FlexLine
            className="mb-2"
            left={<Heading3 title="Tasks" badgeText={tasksQuery.data.length} />}
            right={
              <>
                <CountTasksByStatus tasks={tasksQuery.data} />
                <Button label="Filter" Icon={FunnelIcon} />
              </>
            }
          />
          <TasksTable tasks={tasksQuery.data}></TasksTable>
        </CardBody>
      </Card>
    </div>
  );
}

function CountTasksByStatus({ tasks }) {
  const count = {};
  tasks.forEach((task) => {
    let status = getRealTaskStatus(task);
    count[status] = (count[status] || 0) + 1;
  });

  return (
    <BadgeList className={"me-3"}>
      {count["pending"] && <Badge text={count["pending"]} variant="yellow" />}
      {count["waiting"] && <Badge text={count["waiting"]} variant="indigo" />}
      {count["completed"] && (
        <Badge text={count["completed"]} variant="green" />
      )}
    </BadgeList>
  );
}
