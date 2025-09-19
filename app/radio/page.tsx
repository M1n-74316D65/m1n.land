import RadioPlayerClient from "./radio-player-client";
import { designSystem } from "app/lib/design-system";

export const metadata = {
  title: "Radio",
  description: "M1n's radio station.",
};

export default function RadioPage() {
  return (
    <section>
      <h1 className={`${designSystem.spacing.component.header} text-2xl font-semibold tracking-tighter`}>
        Radio
      </h1>
      <RadioPlayerClient />
    </section>
  );
}