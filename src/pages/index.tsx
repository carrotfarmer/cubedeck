import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { Navbar } from "../components/utils/nav/Navbar";
import { Sessions } from "../components/sessions/Sessions";
import { LandingPage } from "../components/lpg/LandingPage";
import { PageHead } from "../components/utils/PageHead";
import { Footer } from "../components/std/Footer";
import { PageState } from "../components/std/PageState";

const Index = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <PageState loading />;
  if (error)
    return (
      <PageState
        title="Could not connect"
        description="We couldn’t connect to your account. Please refresh the page and try again."
      />
    );
  if (user)
    return (
      <>
        <PageHead title="My practice | Cubedeck" />
        <Navbar />
        <Sessions />
        <Footer />
      </>
    );
  return (
    <>
      <PageHead title="Cubedeck" />
      <Navbar />
      <LandingPage />
    </>
  );
};
export default Index;
