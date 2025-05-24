import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [reviewMode, setReviewMode] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [employee, setEmployee] = useState({
    name: '', email: '', department: '', role: ''
  });

  const [project, setProject] = useState({
    projectname: '', repositoryname: '', customRepositories: [''], programminglanguage: '', applicationType: '', applicationSize: ''
  });

  const [cloudPlatform, setCloudPlatform] = useState({
    platform: '', details: ''
  });

  const handleEmployeeChange = (e) => setEmployee({ ...employee, [e.target.name]: e.target.value });
  const handleProjectChange = (e) => setProject({ ...project, [e.target.name]: e.target.value });
  const handleCloudChange = (e) => setCloudPlatform({ ...cloudPlatform, [e.target.name]: e.target.value });

  const handleCustomRepositoryChange = (index, value) => {
    const updated = [...project.customRepositories];
    updated[index] = value;
    setProject({ ...project, customRepositories: updated });
  };

  const addCustomRepositoryField = () => {
    setProject({ ...project, customRepositories: [...project.customRepositories, ''] });
  };

  const removeCustomRepositoryField = (index) => {
    const updated = [...project.customRepositories];
    updated.splice(index, 1);
    setProject({ ...project, customRepositories: updated });
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleSubmit = async () => {
    debugger;
    const payload = {
      projectName: project.projectname,
      employeeName: employee.name
    };

    try {
      const res = await fetch('https://lo2t07qi22.execute-api.ap-south-1.amazonaws.com/dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('DynamoDB ID:', data.requestId);

      setSubmittedData({
        employee,
        project: {
          ...project,
          cloudPlatform: cloudPlatform.platform,
          cloudDetails: cloudPlatform.details,
        }
      });
      setReviewMode(false);
      setStep(5);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className="app-container">
      <h2 className="title">Developers Portal</h2>
      <form onSubmit={(e) => e.preventDefault()} noValidate>
        <AnimatePresence>
          {step === 1 && !reviewMode && (
            <motion.div className="form-section" initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}>
              <h3>Employee Details</h3>
              <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleEmployeeChange} required />
              <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleEmployeeChange} required />
              <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleEmployeeChange} />
              <input type="text" name="role" placeholder="Role" value={employee.role} onChange={handleEmployeeChange} />
              <button type="button" onClick={() => setStep(2)}>Next</button>
            </motion.div>
          )}

          {step === 2 && !reviewMode && (
            <motion.div className="form-section" initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}>
              <h3>Cloud Platform Details</h3>
              <select name="platform" value={cloudPlatform.platform} onChange={handleCloudChange} required>
                <option value="">Select Platform</option>
                <option value="AWS">AWS</option>
                <option value="Azure">Azure</option>
              </select>

              {cloudPlatform.platform === 'AWS' && (
                <select name="details" value={cloudPlatform.details} onChange={handleCloudChange} required>
                  <option value="">Select AWS Component</option>
                  <option value="AccountID">CICD DevOps</option>
                  <option value="Frontend">Frontend/Amplify/UI/Portal</option>
                  <option value="Backend">Backend</option>
                </select>
              )}

              {cloudPlatform.platform === 'Azure' && (
                <select name="details" value={cloudPlatform.details} onChange={handleCloudChange} required>
                  <option value="">Select Azure Collection</option>
                  <option value="internal-gbit-BU-support">internal-gbit-BU-support</option>
                  <option value="internal-gbit-BU-projects">internal-gbit-BU-projects</option>
                </select>
              )}

              <div className="nav-buttons">
                <button type="button" onClick={() => setStep(1)}>Previous</button>
                <button type="button" onClick={() => setStep(3)}>Next</button>
              </div>
            </motion.div>
          )}

          {step === 3 && !reviewMode && (
            <motion.div className="form-section" initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}>
              <h3>Project Details</h3>
              <input type="text" name="projectname" placeholder="Project Name" value={project.projectname} onChange={handleProjectChange} required />
              <select name="repositoryname" value={project.repositoryname} onChange={handleProjectChange} required>
                <option value="">Select Repository</option>
                <option value="RepositoryName">RepositoryName</option>
                <option value="PredefinedRepo">PredefinedRepo</option>
              </select>

              {project.repositoryname === 'RepositoryName' && (
                <div>
                  {project.customRepositories.map((repo, index) => (
                    <div key={index} className="repo-input">
                      <input
                        type="text"
                        placeholder={`Custom Repository #${index + 1}`}
                        value={repo}
                        onChange={(e) => handleCustomRepositoryChange(index, e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => removeCustomRepositoryField(index)}>-</button>
                    </div>
                  ))}
                  <button type="button" onClick={addCustomRepositoryField}>+ Add Repository</button>
                </div>
              )}

              <select name="programminglanguage" value={project.programminglanguage} onChange={handleProjectChange} required>
                <option value="">Select Language</option>
                <option value="NodeJS">NodeJS</option>
                <option value="Python">Python</option>
              </select>
              <input type="text" name="applicationType" placeholder="Application Type" value={project.applicationType} onChange={handleProjectChange} />
              <input type="text" name="applicationSize" placeholder="Application Size" value={project.applicationSize} onChange={handleProjectChange} />

              <div className="nav-buttons">
                <button type="button" onClick={() => setStep(2)}>Previous</button>
                <button type="button" onClick={handleReview}>Review</button>
              </div>
            </motion.div>
          )}

          {reviewMode && (
            <motion.div className="form-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3>Review Details</h3>
              <table className="review-table">
                <tbody>
                  <tr><th colSpan="2">Employee Details</th></tr>
                  <tr><td>Name</td><td>{employee.name}</td></tr>
                  <tr><td>Email</td><td>{employee.email}</td></tr>
                  <tr><td>Department</td><td>{employee.department}</td></tr>
                  <tr><td>Role</td><td>{employee.role}</td></tr>

                  <tr><th colSpan="2">Cloud Platform Details</th></tr>
                  <tr><td>Platform</td><td>{cloudPlatform.platform}</td></tr>
                  <tr><td>Details</td><td>{cloudPlatform.details}</td></tr>

                  <tr><th colSpan="2">Project Details</th></tr>
                  <tr><td>Project Name</td><td>{project.projectname}</td></tr>
                  <tr><td>Repository</td><td>{project.repositoryname}</td></tr>
                  {project.repositoryname === 'RepositoryName' && (
                    <tr><td>Custom Repositories</td><td>{project.customRepositories.join(', ')}</td></tr>
                  )}
                  <tr><td>Programming Language</td><td>{project.programminglanguage}</td></tr>
                  <tr><td>Application Type</td><td>{project.applicationType}</td></tr>
                  <tr><td>Application Size</td><td>{project.applicationSize}</td></tr>
                </tbody>
              </table>
              <div className="nav-buttons">
                <button type="button" onClick={() => { setReviewMode(false); setStep(3); }}>Previous</button>
                <button type="button" onClick={()=>handleSubmit()}>Submit</button>
              </div>
            </motion.div>
          )}

          {step === 5 && submittedData && (
            <motion.div className="form-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Submitted Record</h3>
              <table className="review-table">
                <tbody>
                  <tr><th colSpan="2">Employee Details</th></tr>
                  <tr><td>Name</td><td>{submittedData.employee.name}</td></tr>
                  <tr><td>Email</td><td>{submittedData.employee.email}</td></tr>
                  <tr><td>Department</td><td>{submittedData.employee.department}</td></tr>
                  <tr><td>Role</td><td>{submittedData.employee.role}</td></tr>

                  <tr><th colSpan="2">Cloud Platform Details</th></tr>
                  <tr><td>Cloud Platform</td><td>{submittedData.project.cloudPlatform}</td></tr>
                  <tr><td>Cloud Details</td><td>{submittedData.project.cloudDetails}</td></tr>

                  <tr><th colSpan="2">Project Details</th></tr>
                  <tr><td>Project Name</td><td>{submittedData.project.projectname}</td></tr>
                  <tr><td>Repository</td><td>{submittedData.project.repositoryname}</td></tr>
                  <tr><td>Custom Repositories</td><td>{submittedData.project.customRepositories}</td></tr>
                  <tr><td>Programming Language</td><td>{submittedData.project.programminglanguage}</td></tr>
                  <tr><td>Application Type</td><td>{submittedData.project.applicationType}</td></tr>
                  <tr><td>Application Size</td><td>{submittedData.project.applicationSize}</td></tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* ✅ Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="success-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              backgroundColor: '#4BB543',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}
          >
            ✅ Submitted Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
