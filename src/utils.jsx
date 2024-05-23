import Badge, { BadgeList } from "./components/atoms/Badge";
import uniqolor from "uniqolor";
import {
  HandRaisedIcon,
  CheckIcon,
  ClockIcon,
  XCircleIcon,
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const _timeAgo = new TimeAgo("en-US");

export function atMostXDecimalPoints(floatValue, fractionDigits) {
  return parseFloat(floatValue.toFixed(fractionDigits));
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
    default:
      text = "No priority";
      variant = "gray";
      Icon = null;
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
          color={uniqolor(tag, { saturation: 80, lightness: [70, 80] }).color}
        />
      ))}
    </BadgeList>
  );
}

export function displayStatusBadgeForTask(task) {
  let status = getRealTaskStatus(task);

  let variant, Icon;
  switch (status) {
    case "completed":
      variant = "green";
      Icon = CheckIcon;
      break;
    case "pending":
      variant = "yellow";
      Icon = ClockIcon;
      break;
    case "waiting":
      variant = "indigo";
      Icon = HandRaisedIcon;
      break;
    case "deleted":
      variant = "red";
      Icon = XCircleIcon;
      break;
  }

  return <Badge text={status} variant={variant} Icon={Icon} />;
}

export function getRealTaskStatus(task) {
  if (task.status == "pending" && task.wait) {
    return "waiting";
  }

  return task.status;
}

export function timeAgo(date) {
  return _timeAgo.format(date, "en-US");
}
