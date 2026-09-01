import React from "react";

const statusStyles = {
  applied: "bg-green-500/10 text-green-400 border-green-500/30",
  rejected: "bg-red-500/10 text-red-400 border-red-500/30",
  shortlisted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  interview_scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

const ApplyJobsCard = ({ curElem }) => {
  const { skills, createdAt, status, job } = curElem;

  return (
    <div className="group relative w-full rounded-2xl border border-border bg-card/80 p-5 text-card-foreground shadow-sm transition hover:border-primary/50 hover:shadow-lg">

      {/* Job Header */}
      <div className="flex flex-col gap-1 mt-5">
        <h2 className="text-lg font-semibold">
          {job.title}
        </h2>
        
      </div>

      {/* Meta Info */}
      <div className="w-full flex flex-col gap-2 text-md justify-between items-start  opacity-80">
         <p className="text-left">
        <span className="font-bold text-md">Description:</span>{job.description}
      </p>
        <p className=" opacity-80">
          Location:{job.location}
        </p>
        <span>Salary: {job.salary}</span>
        <span>
          Applied on {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Description */}
     

      {/* Skills */}
      <div className="flex  gap-2">
        <span className="text-md font-medium opacity-80">
          Required Skills
        </span>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 border rounded-full text-xs opacity-90"
            >
              {skill}
            </span>
          ))}
        </div>
         <span
        className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold border rounded-full
          ${statusStyles[status] || "border-gray-500 text-gray-300"}
        `}
      >
        {status.replace("_", " ").toUpperCase()}
      </span>
      </div>
      {curElem.status=="interview"?<div className="flex flex-col items-center">
  <h1 className="text-red-600 z- font-bold">INTERVIEW SCHEDULED!!</h1>
  {curElem?.interviewlink?<a href={curElem.interviewlink} >interview Link</a>:""}
      <p>{curElem?.interviewdate?new Date(curElem.interviewdate).toLocaleDateString():""}</p>
      <p>{curElem?.interviewtime?curElem.interviewtime:""}</p>
      <h1 className="text-blue-500 z-20 font-bold">check mail for more info</h1>
</div>:""}

      

    </div>
  );
};

export default ApplyJobsCard;
