import Badge, { BadgeList } from "./components/atoms/Badge";
import uniqolor from "uniqolor";
import {
  ArrowPathRoundedSquareIcon,
  CheckIcon,
  ClockIcon,
  XCircleIcon,
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const _timeAgo = new TimeAgo("en-US");

export function atMostXDecimalPoints(floatValue, fractionDigits) {
  return parseFloat(floatValue.toFixed(fractionDigits));
}

export function difference(arr1, arr2) {
  const diff1 = arr1.filter((item) => !arr2.includes(item));
  const diff2 = arr2.filter((item) => !arr1.includes(item));
  return [...diff1, ...diff2];
}

export function displayPriority(priority) {
  let text, variant, Icon;
  switch (priority) {
    case "L":
      text = "Low";
      variant = "green";
      Icon = ChevronDownIcon;
      break;
    case "M":
      text = "Medium";
      variant = "yellow";
      Icon = ChevronUpIcon;
      break;
    case "H":
      text = "High";
      variant = "red";
      Icon = ChevronDoubleUpIcon;
      break;
  }
  return <Badge text={text} variant={variant} Icon={Icon} />;
}

export function displayTags(tags) {
  return (
    <BadgeList>
      {tags.map((tag) => (
        <Badge
          key={tag}
          text={tag}
          style="pill"
          color={uniqolor(tag, { saturation: 80, lightness: [70, 80] }).color}
        />
      ))}
    </BadgeList>
  );
}

export function displayStatusBadgeForTask(task, big = false) {
  let status = getRealTaskStatus(task);

  let variant, Icon;
  switch (status) {
    case "completed":
      variant = "green";
      Icon = CheckIcon;
      break;
    case "deleted":
      variant = "red";
      Icon = XCircleIcon;
      break;
    case "in progress":
      variant = "yellow";
      Icon = ClockIcon;
      break;
    case "pending":
      variant = "gray";
      Icon = LightBulbIcon;
      break;
    case "waiting":
      variant = "indigo";
      Icon = ArrowPathRoundedSquareIcon;
      break;
  }

  if (big) {
    Icon = null;
  }

  return (
    <Badge
      className={big && "!text-sm"}
      text={status}
      variant={variant}
      Icon={Icon}
    />
  );
}

export function getRealTaskStatus(task) {
  if (task.status == "pending" && task.wait) {
    return "waiting";
  }
  if (task.status == "pending" && task.start) {
    return "in progress";
  }

  return task.status;
}

export function timeAgo(date) {
  return _timeAgo.format(date, "en-US");
}
