import React from 'react';

const ConfirmModal = ({
 isOpen,
 onClose,
 onConfirm,
 title = "Are you sure?",
 message = "This action cannot be undone.",
 confirmText = "Confirm",
 cancelText = "Cancel",
 type = "danger" // danger, warning, info
}) => {
 if (!isOpen) return null;

 const typeStyles = {
  danger: "bg-red-500 hover:bg-red-600",
  warning: "bg-amber-500 hover:bg-amber-600",
  info: "bg-blue-500 hover:bg-blue-600"
 };

 return (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
   <div
    className="bg-white dark:bg-[#1a1c2e] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800"
    onClick={(e) => e.stopPropagation()}
   >
    <div className="p-6">
     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
      {title}
     </h3>
     <p className="text-gray-600 dark:text-gray-400">
      {message}
     </p>
    </div>

    <div className="flex items-center justify-end gap-3 p-4 bg-gray-50 dark:bg-gray-800/50">
     <button
      onClick={onClose}
      className="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
     >
      {cancelText}
     </button>
     <button
      onClick={() => {
       onConfirm();
       onClose();
      }}
      className={`px-6 py-2 rounded-xl text-white font-semibold shadow-lg shadow-opacity-20 transition-all active:scale-95 ${typeStyles[type]}`}
     >
      {confirmText}
     </button>
    </div>
   </div>
  </div>
 );
};

export default ConfirmModal;
