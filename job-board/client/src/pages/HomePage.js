import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getJobs } from "../lib/graphql/queries";

function HomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(function () {
    async function fetchJobs() {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
