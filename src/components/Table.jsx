import ChessClock from "./ChessClock";
import ConfigurationClock from "./ConfigurationClock";

export default function Table() {
  return (
    <ChessClock>
      <ConfigurationClock />
    </ChessClock>
  );
}
