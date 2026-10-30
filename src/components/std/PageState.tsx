import { Navbar } from "../utils/nav/Navbar";
import { Footer } from "./Footer";
import { LoginButton } from "../utils/nav/ProfileButton";
import { PageHead } from "../utils/PageHead";

export const PageState = ({
  title = "Loading…",
  description = "",
  loading = false,
  signIn = false,
}: {
  title?: string;
  description?: string;
  loading?: boolean;
  signIn?: boolean;
}) => (
  <>
    <PageHead title={`${title} | Cubedeck`} />
    <Navbar />
    <main className="page flex items-center justify-center">
      <div className="max-w-sm py-20 text-center">
        {loading && (
          <span
            className="spinner mb-4 h-5 w-5 text-muted"
            role="status"
            aria-label="Loading"
          />
        )}
        <h1 className="text-3xl">{title}</h1>
        {description && (
          <p className="mt-3 text-sm text-muted">{description}</p>
        )}
        {signIn && (
          <div className="mt-5">
            <LoginButton label="Sign in with Google" />
          </div>
        )}
      </div>
    </main>
    <Footer />
  </>
);
