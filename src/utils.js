export function getRealTaskStatus(task) {
  if (task.status == "pending" && task.wait) {
    return "waiting";
  }

  return task.status;
}
