import React from "react";

interface PageTitleProps {
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>;
};
