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

      <div className="guestbook-section mt-8">
        <Script
          src="https://guestbooks.meadow.cafe/resources/js/embed_script/590/script.js"
          strategy="afterInteractive"
        />

        <div id="guestbooks___guestbook-form-container">
          <form
            id="guestbooks___guestbook-form"
            action="https://guestbooks.meadow.cafe/guestbook/590/submit"
            method="post"
          >
            <div className="guestbooks___input-container">
              <Input
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                required
              />
              <br />
            </div>
            <div className="guestbooks___input-container">
              <Input
                placeholder="Website (optional)"
                type="url"
                id="website"
                name="website"
              />
            </div>
            <div id="guestbooks___challenge-answer-container"></div>
            <br />
            <div className="guestbooks___input-container">
              <Textarea
                placeholder="Message (plain text only)..."
                id="text"
                name="text"
                style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                required
              />
            </div>
            <br />
            <Button type='submit' variant="outline">Submit</Button>
            <div id="guestbooks___error-message"></div>
          </form>
        </div>

        <div id="guestbooks___guestbook-made-with" style={{ textAlign: 'right' }}>
          <small>
            Made with{' '}
            <Link target="_blank" href="https://guestbooks.meadow.cafe">
              Guestbooks
            </Link>
          </small>
        </div>

        <hr style={{ margin: '1em 0' }} />
        <h3 id="guestbooks___guestbook-messages-header">Messages</h3>
        <div id="guestbooks___guestbook-messages-container"></div>
      </div>
    </section>
  );
}
