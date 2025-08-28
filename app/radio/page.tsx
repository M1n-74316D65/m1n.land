import RadioPlayerClient from "./radio-player-client";
import BlurFade from "app/components/ui/magicui/blur-fade";

export const metadata = {
  title: "Radio",
  description: "M1n's radio station.",
};

export default function RadioPage() {
  return (
    <section>
      <BlurFade delay={0.1} inView>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Radio
        </h1>
      </BlurFade>
      <RadioPlayerClient />
    </section>
  );
}