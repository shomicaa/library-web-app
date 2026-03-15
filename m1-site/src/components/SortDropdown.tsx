import React from "react";

interface SortDropdownProps {
  sortOptions: { value: string; label: string }[];
  selectedSort: string;
  onSortChange: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOptions,
  selectedSort,
  onSortChange,
}) => {
  return (
    <div className="relative">
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
