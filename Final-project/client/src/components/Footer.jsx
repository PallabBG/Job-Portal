const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-6 px-4 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Smart Job Portal | Connecting Talent with Opportunity
      </p>
      </div>
    </footer>
  );
};

export default Footer;