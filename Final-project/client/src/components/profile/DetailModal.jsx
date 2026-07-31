const DetailModal = ({
  open,
  title,
  children,
  onClose,
}) => {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-5">

      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl border border-transparent dark:border-slate-700">

        <div className="flex justify-between items-center border-b dark:border-slate-700 px-6 py-4">

          <h2 className="text-2xl font-bold dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl font-bold hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          >
            ×
          </button>

        </div>

        <div className="overflow-y-auto max-h-[70vh] p-6">

          {children}

        </div>

      </div>

    </div>

  );

};

export default DetailModal;
