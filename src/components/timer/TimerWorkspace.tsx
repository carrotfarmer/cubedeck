import {
  FiArrowLeft,
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiCheck,
} from "react-icons/fi";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "../utils/nav/Navbar";
import { Footer } from "../std/Footer";
import { PageHead } from "../utils/PageHead";
import { Button } from "../ui";
import { useToast } from "../ui/Providers";

interface TimerWorkspaceProps {
  onRecord?: (milliseconds: number) => Promise<void>;
  backHref?: string;
  backLabel?: string;
  context?: string;
}
export const TimerWorkspace = ({
  onRecord,
  backHref = "/",
  backLabel = "Home",
  context = "",
}: TimerWorkspaceProps) => {
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [saving, setSaving] = useState(false);
  const startedAt = useRef(0);
  const accumulated = useRef(0);
  const toast = useToast();
  const toggle = useCallback(() => {
    if (saving) return;
    if (active) {
      const total = accumulated.current + performance.now() - startedAt.current;
      accumulated.current = total;
      setElapsed(total);
      setActive(false);
    } else {
      startedAt.current = performance.now();
      setActive(true);
    }
  }, [active, saving]);
  const reset = useCallback(() => {
    setActive(false);
    setElapsed(0);
    accumulated.current = 0;
  }, []);
  useEffect(() => {
    if (!active) return;
    const interval = window.setInterval(
      () =>
        setElapsed(accumulated.current + performance.now() - startedAt.current),
      10
    );
    return () => window.clearInterval(interval);
  }, [active]);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        target.closest(
          "input,textarea,select,[contenteditable='true'],[role='dialog'],[role='alertdialog'],[role='menu']"
        )
      )
        return;
      if (event.code === "Space") {
        if (target.closest("button,a")) return;
        event.preventDefault();
        toggle();
      }
      if (event.code === "KeyR" && !saving) {
        event.preventDefault();
        reset();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggle, reset, saving]);
  const record = async () => {
    if (!onRecord || active || elapsed === 0 || saving) return;
    setSaving(true);
    try {
      await onRecord(Math.floor(elapsed));
      reset();
      toast({
        title: "Solve saved",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Could not save your solve",
        description: "Your time is still here. Please try again.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };
  const minutes = Math.floor(elapsed / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((elapsed % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const hundredths = Math.floor((elapsed % 1000) / 10)
    .toString()
    .padStart(2, "0");

  return (
    <>
      <PageHead title="Timer | Cubedeck" />
      <Navbar />
      <main className="page">
        <Link href={backHref} passHref>
          <a className="text-link mb-4 inline-flex items-center gap-1.5 text-xs">
            <FiArrowLeft size={12} />
            {backLabel}
          </a>
        </Link>
        <div className="page-header">
          <div>
            <h1 className="page-title">Timer</h1>
            {context && <p className="mt-2 text-xs text-muted">{context}</p>}
          </div>
        </div>
        <section
          aria-label="Stopwatch"
          className="panel flex min-h-[350px] flex-col items-center justify-center px-4 py-10 sm:min-h-[390px]"
        >
          <span className="text-xs text-muted">
            {active ? "Running" : elapsed ? "Paused" : "Ready"}
          </span>
          <p
            className="my-6 whitespace-nowrap font-mono text-[clamp(42px,10vw,92px)] font-normal leading-none tracking-[-.06em] tabular-nums"
            aria-label={`Elapsed time ${minutes} minutes ${seconds} seconds ${hundredths} hundredths`}
          >
            {minutes}:{seconds}
            <span className="text-muted">.{hundredths}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="secondary"
              onClick={reset}
              disabled={elapsed === 0 || saving}
            >
              <FiRotateCcw size={13} />
              Reset
            </Button>
            <Button
              className="min-w-[110px]"
              onClick={toggle}
              disabled={saving}
            >
              {active ? <FiPause size={13} /> : <FiPlay size={13} />}{" "}
              {active ? "Pause" : elapsed ? "Resume" : "Start"}
            </Button>
            {onRecord && (
              <Button
                variant="secondary"
                onClick={record}
                disabled={active || elapsed === 0}
                loading={saving}
              >
                <FiCheck size={13} />
                Save solve
              </Button>
            )}
          </div>
          <div className="mt-6 hidden items-center gap-4 text-[10px] text-muted sm:flex">
            <span>
              <kbd className="kbd mr-1.5">space</kbd>start / pause
            </span>
            <span>
              <kbd className="kbd mr-1.5">R</kbd>reset
            </span>
          </div>
        </section>
        {!onRecord && (
          <p className="mt-4 text-center text-xs text-muted">
            <Link href="/" passHref>
              <a className="underline underline-offset-4 hover:text-ink">
                Sign in
              </a>
            </Link>{" "}
            and use a session to save solves.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};
