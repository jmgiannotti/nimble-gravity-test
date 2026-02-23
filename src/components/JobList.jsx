import { useState } from 'react';
import { applyToJob } from '../services/api';
import './JobList.css';

function JobList({ jobs, candidateData }) {
    const [repoUrls, setRepoUrls] = useState({});
    const [loadingJob, setLoadingJob] = useState(null);
    const [message, setMessage] = useState(null);

    const handleInputChange = (jobId, value) => {
        setRepoUrls((prev) => ({
            ...prev,
            [jobId]: value
        }));
    };

    const handleSubmit = async (jobId) => {
        const repoUrl = repoUrls[jobId];

        if (!repoUrl) {
            setMessage("Enter a repo URL");
            return;
        }

        if (!candidateData) {
            setMessage("Candidate data not loaded");
            return;
        }

        try {
            setLoadingJob(jobId);
            setMessage(null);

            const res = await applyToJob(
                candidateData.uuid,
                jobId,
                candidateData.candidateId,
                candidateData.applicationId,
                repoUrl
            );

            console.log("Apply response:", res);
            setMessage("Applied successfully!");
        } catch (error) {
            console.error("Apply error:", error);
            setMessage("Failed to apply");
        } finally {
            setLoadingJob(null);
        }
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
                                onChange={(e) =>
                                    handleInputChange(job.id, e.target.value)
                                }
                                disabled={loadingJob === job.id}
                            />

                            <button
                                className="job-btn"
                                onClick={() => handleSubmit(job.id)}
                                disabled={loadingJob === job.id}
                            >
                                {loadingJob === job.id ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {message && (
                <span>
                    {message}
                </span>
            )}
        </div>
    );
}

export default JobList;