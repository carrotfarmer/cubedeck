import Link from "next/link";
import { FiClock, FiLayers, FiUsers } from "react-icons/fi";
import { CubeVisual } from "./CubeVisual";
import { Footer } from "../std/Footer";
import { LoginButton } from "../utils/nav/ProfileButton";
import { buttonClass } from "../ui";

export const LandingPage = () => (
  <>
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 sm:px-8">
      <section className="pb-10 pt-10 text-center sm:pb-14 sm:pt-14">
        <div className="mx-auto mb-3 w-[94px]">
          <CubeVisual />
        </div>
        <h1 className="font-display text-6xl tracking-wide sm:text-7xl">
          cubedeck
        </h1>
        <p className="mt-4 text-base">A simple timer for your cubes.</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Time your solves, keep track of sessions, and compare times with
          friends.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <Link href="/timer" passHref>
            <a className={buttonClass()}>
              <FiClock size={14} />
              Open timer
            </a>
          </Link>
          <LoginButton label="Sign in with Google" />
        </div>
        <p className="mt-4 text-[11px] text-muted">
          Free to use. Try the timer without signing in.
        </p>
      </section>
      <section
        aria-label="Features"
        className="grid gap-7 border-t border-line py-8 sm:grid-cols-3 sm:gap-8 sm:py-10"
      >
        {[
          {
            icon: FiLayers,
            title: "Sessions",
            text: "Organize solves by puzzle or practice session.",
          },
          {
            icon: FiClock,
            title: "Statistics",
            text: "See your best, average, and slowest times.",
          },
          {
            icon: FiUsers,
            title: "Groups",
            text: "Share a group with friends and compare solves.",
          },
        ].map((feature) => (
          <div key={feature.title}>
            <div className="mb-3 flex items-center gap-2.5">
              <feature.icon size={16} className="text-muted" />
              <h2 className="text-xl">{feature.title}</h2>
            </div>
            <p className="text-xs leading-relaxed text-muted">{feature.text}</p>
          </div>
        ))}
      </section>
      <div className="mb-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-line pt-6 font-mono text-[10px] text-muted">
        <span className="font-sans text-[11px]">Puzzles</span>
        {["2×2", "3×3", "4×4", "5×5", "6×6", "7×7", "Pyraminx"].map(
          (puzzle) => (
            <span key={puzzle}>{puzzle}</span>
          )
        )}
      </div>
    </main>
    <Footer />
  </>
);
