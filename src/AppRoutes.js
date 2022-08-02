import { Routes, Route } from 'react-router-dom';
import CreateVoteTopic from './components/CreateVoteTopic';
import Voting from './components/Voting';
import Thankyou from './components/Thankyou';
import VotingResult from './components/VotingResult';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateVoteTopic />} />
      <Route path="/voting/:id" element={<Voting />} />
      <Route path="/results/:id" element={<VotingResult/>} />
      <Route path="/thankyou" element={<Thankyou/>} />
    </Routes>
  );
};

export default AppRoutes;
