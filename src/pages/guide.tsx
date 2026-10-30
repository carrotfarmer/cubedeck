import Link from "next/link";
import { Navbar } from "../components/utils/nav/Navbar";
import { Footer } from "../components/std/Footer";
import { PageHead } from "../components/utils/PageHead";
import { buttonClass } from "../components/ui";

const GuidePage = () => (
  <>
    <PageHead title="Guide | Cubedeck" />
    <Navbar />
    <main className="page">
      <div className="max-w-2xl">
        <h1 className="page-title mb-7">Guide</h1>
        <div className="space-y-7">
          {[
            {
              title: "Sessions",
              text: "Sign in with Google and select New session. Add a name, notes, and puzzle type. Use separate sessions for different puzzles or practice sets.",
            },
            {
              title: "Timer",
              text: "Open the timer from a session to record solves there. Press Start or use the space bar to begin and pause. Use Resume to continue, Reset (R) to clear the time, and Save solve to record it. The public timer works without an account, but doesn’t save times.",
            },
            {
              title: "Manual entry",
              text: "Select Add solve in a session or group to enter a time from another timer. Times can range from 1 second to 59 minutes, 59 seconds. Use the trash icon to delete a solve.",
            },
            {
              title: "Statistics",
              text: "The Statistics tab shows your solve count, average, fastest, and slowest times. Your dashboard also has combined statistics across all sessions.",
            },
            {
              title: "Groups",
              text: "Create a group from the Groups page, then share its invite code with friends. To join an existing group, select Join group and enter its code. Group solves appear on the shared board, with a leaderboard and group statistics.",
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-xl">{section.title}</h2>
              <p className="text-[13px] leading-7 text-muted">{section.text}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 border-t border-line pt-5">
          <Link href="/timer" passHref>
            <a className={buttonClass("secondary")}>Open timer</a>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </>
);
export default GuidePage;
