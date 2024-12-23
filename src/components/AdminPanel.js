"use client"

import { useState, useEffect } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    contactEmail: ''
  });

//   console.log("jobs = ", jobs)

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs", {
        cache: "no-store",
      });
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response = {};
        if(isEditModalOpen) {
            response = await fetch(`/api/jobs?id=${currentJob._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
        } else {
            response = await fetch('/api/jobs', {
                method: 'POST',
                body: JSON.stringify(formData),
              });
        }

    //   const response = await fetch('/api/jobs', {
    //     method: isEditModalOpen ? 'PUT' : 'POST',
    //     body: JSON.stringify(isEditModalOpen ? { ...formData, id: currentJob._id } : formData),
    //   });
      
      if (response.ok) {
        fetchJobs();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`/api/jobs?id=${jobId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchJobs();
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      contactEmail: job.contactEmail
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setCurrentJob(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: ''
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings Admin</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Add Job
        </button>
      </div>

      <div className="grid gap-4">
        {jobs && jobs.map((job) => (
          <div key={job._id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                  <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
                  <p className="text-gray-600"><strong>Contact:</strong> {job.contactEmail}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {isEditModalOpen ? 'Edit Job' : 'Add New Job'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded p-2"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salary</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
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
                  {isEditModalOpen ? 'Save Changes' : 'Add Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;