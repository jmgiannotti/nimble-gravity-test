import { useEffect, useState } from 'react';
import { getCandidateInfo } from './services/api';

function App() {

  const [candidateData, setCandidateData] = useState(null);

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
    </div>
  );
}

export default App;