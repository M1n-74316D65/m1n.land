import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Textarea } from "app/components/ui/textarea"
import Script from 'next/script';
import Link from 'next/link';

export const metadata = {
  title: "Guestbook",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My Guestbook
      </h1>

      <div className="space-y-6">
        <Script
          src="https://guestbooks.meadow.cafe/resources/js/embed_script/590/script.js"
          strategy="afterInteractive"
        />

        <div id="guestbooks___guestbook-form-container">
          <form
            id="guestbooks___guestbook-form"
            action="https://guestbooks.meadow.cafe/guestbook/590/submit"
            method="post"
            className="space-y-4"
          >
            <div className="guestbooks___input-container">
              <Input
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                required
                className="w-full"
              />
            </div>
            <div className="guestbooks___input-container">
              <Input
                placeholder="Website (optional)"
                type="url"
                id="website"
                name="website"
                className="w-full"
              />
            </div>
            <div id="guestbooks___challenge-answer-container"></div>
            <div className="guestbooks___input-container">
              <Textarea
                placeholder="Message (plain text only)..."
                id="text"
                name="text"
                required
                className="w-full min-h-[100px] resize-vertical"
              />
            </div>
            <Button type='submit' variant="outline" className="w-full sm:w-auto">
              Submit
            </Button>
            <div id="guestbooks___error-message"></div>
          </form>
        </div>

        <div id="guestbooks___guestbook-made-with" className="text-right">
          <small className="text-muted-foreground">
            Made with{' '}
            <Link 
              target="_blank" 
              href="https://guestbooks.meadow.cafe"
              className="hover:underline"
            >
              Guestbooks
            </Link>
          </small>
        </div>

        <div className="border-t pt-6">
          <h3 id="guestbooks___guestbook-messages-header" className="font-semibold text-lg mb-4 tracking-tight">
            Messages
          </h3>
          <div id="guestbooks___guestbook-messages-container"></div>
        </div>
      </div>
    </section>
  );
}
