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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-5">
        🌐 Social Links
      </h2>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.key}>
            <label className="block text-sm font-medium mb-1">
              {link.icon} {link.label}
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
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <>
                {socialLinks[link.key] ? (
                  <a
                    href={socialLinks[link.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {socialLinks[link.key]}
                  </a>
                ) : (
                  <p className="text-gray-400">
                    Not provided
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksCard;