const InfoCard = ({
  icon,
  title,
  count,
  color = "blue",
  onClick,
}) => {
  const colors = {
    blue: "border-blue-500 bg-blue-50",
    green: "border-green-500 bg-green-50",
    yellow: "border-yellow-500 bg-yellow-50",
    red: "border-red-500 bg-red-50",
    purple: "border-purple-500 bg-purple-50",
    indigo: "border-indigo-500 bg-indigo-50",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-l-4 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 ${colors[color]}`}
    >
      <div className="flex justify-between items-center">

        <div>

          <div className="text-4xl">
            {icon}
          </div>

          <h3 className="text-xl font-bold mt-3">
            {title}
          </h3>

          <p className="text-gray-600 mt-1">
            {count} Record{count !== 1 && "s"}
          </p>

        </div>

        <div className="text-blue-600 font-semibold">
          View →
        </div>

      </div>
    </button>
  );
};

export default InfoCard;
