import { useState, useEffect } from "react";

export default function Timer({ startDateTime }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const elapsed = new Date(currentDateTime - startDateTime);

  const hours = String(elapsed.getUTCHours()).padStart(2, "0");
  const minutes = String(elapsed.getUTCMinutes()).padStart(2, "0");
  const seconds = String(elapsed.getUTCSeconds()).padStart(2, "0");

  return (
    <span className="font-mono text-sm">
      {`${hours}:${minutes}:${seconds}`}
    </span>
  );
}
