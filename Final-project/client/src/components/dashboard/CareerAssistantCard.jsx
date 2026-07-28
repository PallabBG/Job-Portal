import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaComments,
  FaFileAlt,
  FaLightbulb,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

const CareerAssistantCard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaFileAlt className="text-blue-600" />,
      title: "Resume Review",
      desc: "Get resume improvement tips",
    },
    {
      icon: <FaUserTie className="text-green-600" />,
      title: "Interview Help",
      desc: "Practice common interview questions",
    },
    {
      icon: <FaLightbulb className="text-yellow-500" />,
      title: "Career Guidance",
      desc: "Explore career paths and skills",
    },
    {
      icon: <FaComments className="text-purple-600" />,
      title: "Ask Anything",
      desc: "Chat with your AI career mentor",
    },
  ];

  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 shadow-2xl transition-colors duration-300">
      {/* Background Decorations */}

      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative p-8 lg:p-10">
        {/* Header */}

        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <FaRobot className="text-3xl text-white" />
            </div>

            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-semibold tracking-wide uppercase">
                AI Powered
              </div>

              <h2 className="mt-3 text-3xl font-bold text-white">
                AI Career Assistant
              </h2>

              <p className="mt-3 max-w-2xl text-blue-100 leading-7">
                Your personal AI mentor for resume analysis, interview
                preparation, career planning, skill recommendations and job
                guidance—all in one place.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/job-chatbot")}
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Start AI Chat
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}

        <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Ready to accelerate your career?
              </h3>

              <p className="mt-2 text-blue-100">
                Ask career questions, improve your resume, prepare for
                interviews, and receive personalized guidance from your AI
                assistant anytime.
              </p>
            </div>

            <button
              onClick={() => navigate("/job-chatbot")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/15 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white/20"
            >
              Open Assistant
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAssistantCard;
