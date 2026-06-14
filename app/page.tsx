import SequenceScroll from "@/components/SequenceScroll";
import TheCouple from "@/components/TheCouple";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero — Scrollytelling canvas sequence */}
      <SequenceScroll />

      {/* The Couple — Bento grid */}
      <TheCouple />

      {/* Event Details — Ceremony & Reception */}
      <EventDetails />

      {/* Gallery — Masonry pre-wedding photos */}
      <Gallery />

      {/* RSVP Form */}
      <RSVPForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
