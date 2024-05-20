import taskOverlord from "../../assets/taskoverlord.png";

export default function SplashScreen() {
  return (
    <div className="flex h-screen w-screen animate-pulse items-center justify-center bg-neutral-100">
      <img src={taskOverlord} />
    </div>
  );
}
