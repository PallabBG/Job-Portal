import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DailyIframe from "@daily-co/daily-js";
import axios from "axios";

const JoinLiveClass = () => {
  const { id } = useParams();

  const containerRef = useRef(null);
  const callFrameRef = useRef(null);

  const [liveClass, setLiveClass] = useState(null);
  const [joined, setJoined] = useState(false);

  const getClass = async () => {
    try {
      const res = await axios.get(`http://localhost:5500/api/liveclasses/${id}`);
      setLiveClass(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Load failed");
    }
  };

  useEffect(() => {
    getClass();

    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
      }
    };
  }, [id]);

  const joinMeeting = () => {
    if (!liveClass?.roomUrl) {
      alert("Meeting room not found");
      return;
    }

    const callFrame = DailyIframe.createFrame(
      containerRef.current,
      {
        iframeStyle: {
          width: "100%",
          height: "700px",
          border: "0",
          borderRadius: "16px",
        },

        showLeaveButton: true,
        showFullscreenButton: true,
      }
    );

    callFrame.join({
      url: liveClass.roomUrl,
    });

    callFrameRef.current = callFrame;

    setJoined(true);
  };

  const leaveMeeting = async () => {
    if (callFrameRef.current) {
      await callFrameRef.current.leave();

      callFrameRef.current.destroy();

      callFrameRef.current = null;

      setJoined(false);
    }
  };

  if (!liveClass) {
    return (
      <h2 className="text-center py-20 text-blue-600">
        Loading classroom...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            {liveClass.title}
          </h1>

          <p className="mb-2">
            <b>Subject:</b> {liveClass.subject}
          </p>

          <p className="mb-2">
            <b>Teacher:</b> {liveClass.employerName}
          </p>

          <p className="mb-5">
            <b>Schedule:</b> {liveClass.date} at {liveClass.time}
          </p>

          {!joined ? (
            <button
              onClick={joinMeeting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Join Meeting
            </button>
          ) : (
            <button
              onClick={leaveMeeting}
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Leave Meeting
            </button>
          )}
        </div>

        <div
          ref={containerRef}
          className="bg-black rounded-2xl min-h-[700px]"
        ></div>
      </div>
    </div>
  );
};

export default JoinLiveClass;