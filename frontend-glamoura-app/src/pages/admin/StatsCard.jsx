import { Link } from "react-router-dom";

const StatsCard = ({
  icon,
  title,
  value,
  percentage,
  description,
  isPositive,
  href
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-grey-600 shadow-lg flex flex-col justify-between w-64 hover:shadow-xl transition-shadow duration-200">
      <div className="flex justify-between mx-3">
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 p-3 rounded-lg">{icon}</div>
        </div>
        <div className="text-right">
          <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
          <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
      </div>
      <div className="mt-4">
        <Link to={href}>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StatsCard;
