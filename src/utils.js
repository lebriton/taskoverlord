export function getRealTaskStatus(task) {
  if (task.wait) {
    return "waiting";
  }

  return task.status;
}
