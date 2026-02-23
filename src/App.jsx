import { useEffect, useState } from 'react';
import { getCandidateInfo, getJobsList } from './services/api';

function App() {

  const [candidateData, setCandidateData] = useState(null);
  const [jobsList, setJobsList] = useState(null);

  useEffect(() => {

    const myEmail = "juanmartingiannotti@gmail.com";

    const fetchData = async () => {
      try {
        const data = await getCandidateInfo(myEmail);
        console.log("Candidate data:", data);
        setCandidateData(data);
      } catch (error) {
        console.error("Get candidate info error:", error);
      }

      try {
        const jobs = await getJobsList();
        console.log("Jobs list:", jobs);
        setJobsList(jobs);
      } catch (error) {
        console.error("Get jobs list error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Nimble Gravity Challenge</h1>
      {candidateData && (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(candidateData, null, 2)}
        </pre>
      )}
      <h2>Open Positions</h2>
      {jobsList && (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(jobsList, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;