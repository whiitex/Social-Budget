import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Phase0 from "./components/Phase/Phase0";
import Phase1 from "./components/Phase/Phase1";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // state PHASE definition
  const [phase, setPhase] = useState(1);
  const phaseName = [
    "Phase 0 - Budget definition",
    "Phase 1 - Proposal insertion",
    "Phase 2 - Preference assignment",
    "Final phase - Decision announcement",
    "Loading...",
  ];
  const handlePhase = (p) => {
    setPhase(p);
  };

  return (
    <>
      <Header isAdmin={true} />

      <Container id="content" className="pt-5 mt-5 mb-5">
        <h1 className="text-center">{phaseName[phase]}</h1>

        {phase === 0 ? (
          <Phase0 />
        ) : phase === 1 ? (
          <Phase1 />
        ) : phase === 2 ? (
          <></>
        ) : phase === 3 ? (
          <></>
        ) : (
          <div className="text-center">
            <h2>Please wait...</h2>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default App;
