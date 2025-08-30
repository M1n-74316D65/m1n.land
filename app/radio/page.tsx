import RadioPlayerClient from "./radio-player-client";

export const metadata = {
  title: "Radio",
  description: "M1n's radio station.",
};

export default function RadioPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Radio
      </h1>
      <RadioPlayerClient />
    </section>
  );
}