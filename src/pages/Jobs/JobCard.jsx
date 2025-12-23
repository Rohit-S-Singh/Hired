import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const openJob = () => {
    navigate(`/job/${job._id}`);
  };

  return (
    <div
      onClick={openJob}
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <h3>{job.title}</h3>
      <p>{job.companyName}</p>
      <p>{job.location}</p>
      <small>{job.workMode} • {job.jobType}</small>
    </div>
  );
};

export default JobCard;
