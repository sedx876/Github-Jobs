import React from 'react';
import './styles/App.css';
import useFetchJobs from './components/useFetchJobs'
import { Container } from 'react-bootstrap'

function App() {

  const { jobs, loading, error } = useFetchJobs()

  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error, Try Refreshing...</h1>}
      <h1>{jobs.length}</h1>
    </Container>
  );
}

export default App;
