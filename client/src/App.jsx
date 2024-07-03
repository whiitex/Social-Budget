import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Phase0 from "./components/Phase/Phase0";
import Phase1 from "./components/Phase/Phase1";
import Phase2 from "./components/Phase/Phase2";
import Phase3 from "./components/Phase/Phase3";
import AuthAPI from "./API/auth.api.mjs";
import ProposalAPI from "./API/proposal.api.mjs";
import "./App.css";

function App() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  // state USER, ISADMIN
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials) => {
    const user = await AuthAPI.login(credentials);
    setUser(user);
    setIsAdmin(user.isadmin);
  };

  const handleLogout = async () => {
    await AuthAPI.logout();
    setUser(null);
    setIsAdmin(false);
  };

  // state PHASE
  const [phase, setPhase] = useState(0);
  const phaseName = [
    "Phase 0 - Budget definition",
    "Phase 1 - Proposal insertion",
    "Phase 2 - Preference assignment",
    "Final phase - Decision announcement",
    "Loading...",
  ];

  // state BUDGET
  const [budget, setBudget] = useState(0);
  const handleBudget = (b) => {
    setBudget(b);
  };

  const [proposals, setProposals] = useState([]);

  // get current user info, if cookies are set
  useEffect(() => {
    AuthAPI.getUserInfo()
      .then((user) => {
        setUser(user);
        setIsAdmin(user.isadmin);
        if (!user) return;
        ProposalAPI.getAllProposals()
          .then((propos) => {
            setProposals(propos);
          })
          .catch((err) => console.error(err.message));
      })
      .catch((err) => {
        setUser(null);
        setIsAdmin(false);
      });
  }, [shouldRefresh]);

  return (
    <>
      <Header
        isAdmin={isAdmin}
        user={user}
        phase={phase}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        setShouldRefresh={setShouldRefresh}
      />

      <Container id="content" className="pt-5 mt-5 mb-5">
        <h1 className="text-center">{phaseName[phase]}</h1>

        {/* Phase 0 - Budget definition */}
        {phase === 0 ? (
          isAdmin ? (
            <Phase0 handleBudget={handleBudget} isAdmin={isAdmin} />
          ) : (
            <h3 className="text-center mt-5">
              Waiting for the admin to define the budget amount
            </h3>
          )
        ) : // Phase 1 - Proposal insertion
        phase === 1 ? (
          user ? (
            <Phase1 user={user} />
          ) : (
            <h3 className="text-center mt-5">
              Please login to insert a proposal
            </h3>
          )
        ) : // Phase 2 - Preference assignment
        phase === 2 ? (
          !user ? (
            <h3 className="text-center mt-5">
              Please login to assign preferences
            </h3>
          ) : proposals.length === 0 ? (
            <h3 className="text-center mt-5">No proposals...</h3>
          ) : (
            <Phase2 proposals={proposals} user={user} />
          )
        ) : // Final phase - Decision announcement
        phase === 3 ? (
          proposals.length === 0 ? (
            <h3 className="text-center mt-5">No proposals...</h3>
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
