import React from "react";

export const Table = ({ children }) => <table className="w-full text-left table-auto min-w-max">{children}</table>;
export const TableHeader = ({ children }) => <thead className="text-sm font-semibold text-gray-400 uppercase">{children}</thead>;
export const TableBody = ({ children }) => <tbody className="text-sm text-gray-300">{children}</tbody>;
export const TableRow = ({ children }) => <tr className="border-b border-[#3a3a41]">{children}</tr>;
export const TableHead = ({ className = "", children }) => <th className={`p-4 ${className}`}>{children}</th>;
export const TableCell = ({ className = "", children }) => <td className={`p-4 ${className}`}>{children}</td>;