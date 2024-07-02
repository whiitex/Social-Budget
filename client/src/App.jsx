import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Phase0 from "./components/Phase/Phase0";
import Phase1 from "./components/Phase/Phase1";
import Phase2 from "./components/Phase/Phase2";
import Phase3 from "./components/Phase/Phase3";
import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [user, setUser] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // state PHASE
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

  const [proposals, setProposals] = useState([]);

  return (
    <>
      <Header isAdmin={isAdmin} user={user} setUser={setUser} />

      <Container id="content" className="pt-5 mt-5 mb-5">
        <h1 className="text-center">{phaseName[phase]}</h1>

        {/* Phase 0 - Budget definition */}
        {phase === 0 ? (
          <Phase0 />
        ) : // Phase 1 - Proposal insertion
        phase === 1 ? (
          <Phase1 />
        ) : // Phase 2 - Preference assignment
        phase === 2 ? (
          proposals.length === 0 ? (
            <div className="text-center">
              <h2>No proposals...</h2>
            </div>
          ) : (
            <Phase2 proposals={[1, 2]} />
          )
        ) : // Final phase - Decision announcement
        phase === 3 ? (
          proposals.length === 0 ? (
            <div className="text-center">
              <h2>No proposals...</h2>
            </div>
          ) : (
            <Phase3 proposals={[]} budget={500} />
          )
        ) : (
          // Loading...
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
