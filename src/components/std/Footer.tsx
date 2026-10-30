import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export const Footer = () => (
  <footer className="mt-auto border-t border-line">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-[11px] text-muted sm:px-8">
      <span>
        Cubedeck <span className="mx-1.5 opacity-40">/</span> Dhruva Srinivas
      </span>
      <div className="flex items-center gap-5">
        <Link href="/guide" passHref>
          <a className="hover:text-ink">Guide</a>
        </Link>
        <a
          href="https://github.com/carrotfarmer/cubedeck"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-ink"
        >
          GitHub <FiExternalLink size={10} />
        </a>
      </div>
    </div>
  </footer>
);
