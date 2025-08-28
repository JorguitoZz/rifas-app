import React from "react";

export const Card = ({ className = "", children }) => {
    return <div className={`p-6 bg-[#27272A] rounded-lg shadow-md ${className}`}>{children}</div>;
};

export const CardHeader = ({ className = "", children }) => {
    return <div className={`flex flex-row items-center justify-between space-y-0 pb-2 ${className}`}>{children}</div>;
};

export const CardTitle = ({ className = "", children }) => {
    return <h3 className={`text-sm font-medium text-gray-400 ${className}`}>{children}</h3>;
};

export const CardContent = ({ className = "", children }) => {
    return <div className={`pt-2 ${className}`}>{children}</div>;
};