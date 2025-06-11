export const metadata = {
  title: "Guestbook",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My Links
      </h1>

      <div>
        <iframe
          src="https://betterstacks.com/embed/profile/m1n?showHeader=false&showSocial=false"
          width="100%"
          height="600px"
          className="rounded-lg shadow-lg border-0 overflow-auto"
          title="My Links - BetterStacks"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
