"use client"

import { useState, useEffect } from 'react';

const CandidatePortal = () => {
  const [jobs, setJobs] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactEmail: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs", {
        cache: "no-store",
      });
      const data = await response.json();
      setJobs(data.jobs.map(job => ({
        ...job,
        hasApplied: checkIfApplied(job._id)
      })));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const checkIfApplied = (jobId) => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    return appliedJobs.includes(jobId);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob._id,
          ...formData
        }),
      });

      if (response.ok) {
        // Store application in localStorage
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
        localStorage.setItem('appliedJobs', JSON.stringify([...appliedJobs, selectedJob._id]));
        
        // Update UI
        setJobs(jobs.map(job => 
          job._id === selectedJob._id ? { ...job, hasApplied: true } : job
        ));
        
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJob(null);
    setFormData({ name: '', contactEmail: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
      
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                  <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
                </div>
              </div>
              <div>
                {job.hasApplied ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                    Already Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(job)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Apply for {selectedJob?.title}</h2>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatePortal;