import { useState } from 'react';
import './JobList.css';

function JobList({ jobs }) {

    const [repoUrls, setRepoUrls] = useState({});

    const handleInputChange = (jobId, value) => {
        setRepoUrls(prev => ({ ...prev, [jobId]: value }));
    };

    const handleSubmit = (jobId) => {
        const url = repoUrls[jobId] || '';
        console.log(`Submit for job ${jobId}:`, url);
    };

    if (!jobs || jobs.length === 0) {
        return <p className="jobs-empty">No open positions.</p>;
    }

    return (
        <div className="jobs-section">
            <h2 className="jobs-title">Open Positions</h2>
            <div className="jobs-list">
                {jobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <span className="job-name">{job.title}</span>
                        <div className="job-form">
                            <input
                                type="text"
                                className="job-input"
                                placeholder="github.com/user/repo"
                                value={repoUrls[job.id] || ''}
                                onChange={(e) => handleInputChange(job.id, e.target.value)}
                            />
                            <button
                                className="job-btn"
                                onClick={() => handleSubmit(job.id)}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobList;
