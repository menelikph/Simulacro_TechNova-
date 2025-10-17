/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function Modal({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
