const SocialLinksCard = ({
  editing,
  socialLinks,
  setSocialLinks,
}) => {
  const links = [
    {
      key: "github",
      label: "GitHub",
      icon: "🐙",
      placeholder: "https://github.com/username",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: "💼",
      placeholder: "https://linkedin.com/in/username",
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: "🌐",
      placeholder: "https://yourportfolio.com",
    },
    {
      key: "leetcode",
      label: "LeetCode",
      icon: "🧩",
      placeholder: "https://leetcode.com/u/username",
    },
    {
      key: "hackerrank",
      label: "HackerRank",
      icon: "💻",
      placeholder: "https://hackerrank.com/profile/username",
    },
    {
      key: "codechef",
      label: "CodeChef",
      icon: "🍽️",
      placeholder: "https://codechef.com/users/username",
    },
    {
      key: "codeforces",
      label: "Codeforces",
      icon: "⚡",
      placeholder: "https://codeforces.com/profile/username",
    },
  ];

  return (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">

    {/* Header */}
    <div className="mb-6">

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        🌐 Social Links
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Connect your coding profiles, portfolio and professional accounts.
      </p>

    </div>

    <div className="space-y-5">

      {links.map((link) => (

        <div
          key={link.key}
          className="border border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-900 p-4 transition-colors duration-300"
        >

          <label className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200 mb-3">

            <span className="text-xl">
              {link.icon}
            </span>

            <span>
              {link.label}
            </span>

          </label>

          {editing ? (

            <input
              type="url"
              placeholder={link.placeholder}
              value={socialLinks[link.key]}
              onChange={(e) =>
                setSocialLinks({
                  ...socialLinks,
                  [link.key]: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />

          ) : (

            socialLinks[link.key] ? (

              <a
                href={socialLinks[link.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline break-all font-medium"
              >
                🔗 {socialLinks[link.key]}
              </a>

            ) : (

              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">

                <span className="text-lg">
                  —
                </span>

                <span>
                  Not provided
                </span>

              </div>

            )

          )}

        </div>

      ))}

    </div>

  </div>
);
};

export default SocialLinksCard;
