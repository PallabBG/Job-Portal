import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray transition"
    >
      <div className="flex items-center gap-3">
        {darkMode ? (
          <FaSun className="text-yellow-500" />
        ) : (
          <FaMoon className="text-blue-600" />
        )}

        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>

      <div
        className={`w-11 h-6 rounded-full relative transition ${
          darkMode ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
            darkMode ? "left-5" : "left-0.5"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
