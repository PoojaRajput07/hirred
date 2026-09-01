import React from 'react'

const InterviewForm = (curElem) => {
   
  return (
    <div>
      
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-zinc-900 p-6 rounded-lg w-[350px] text-white space-y-4">

      <h2 className="text-lg font-semibold">Schedule Interview for ${curElem.job.title}</h2>

      <input
        type="date"
        className="w-full p-2 rounded bg-zinc-800"
        onChange={(e) =>
          setInterviewData({ ...interviewData, date: e.target.value })
        }
      />

      <input
        type="time"
        className="w-full p-2 rounded bg-zinc-800"
        onChange={(e) =>
          setInterviewData({ ...interviewData, time: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Meeting link / Location"
        className="w-full p-2 rounded bg-zinc-800"
        onChange={(e) =>
          setInterviewData({ ...interviewData, link: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleInterviewSubmit}>
          Schedule
        </Button>
      </div>
    </div>
  </div>


      
    </div>
  )
}

export default InterviewForm
