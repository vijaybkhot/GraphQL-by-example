import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCompany } from "../lib/graphql/queries";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(
    function () {
      async function fetchCompany(companyId) {
        try {
          const fetchedCompany = await getCompany(companyId);
          setCompany(fetchedCompany);
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchCompany(companyId);
    },
    [companyId]
  );

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
