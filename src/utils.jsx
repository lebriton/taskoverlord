import Badge, { BadgeList } from "./components/atoms/Badge";
import uniqolor from "uniqolor";
import {
  HandRaisedIcon,
  CheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export function atMostXDecimalPoints(floatValue, fractionDigits) {
  return parseFloat(floatValue.toFixed(fractionDigits));
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
      ))}{" "}
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
  }

  return <Badge text={status} variant={variant} Icon={Icon} />;
}

export function getRealTaskStatus(task) {
  if (task.status == "pending" && task.wait) {
    return "waiting";
  }

  return task.status;
}
