import React from "react";

const Badge = ({ variant = "default", className = "", children }) => {
    const variantStyles = {
        default: "bg-green-600 text-white",
        secondary: "bg-yellow-500 text-white",
        outline: "border border-gray-500 text-gray-400",
    };
    const finalStyles = `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${variantStyles[variant]} ${className}`;
    
    return <span className={finalStyles}>{children}</span>;
};

export default Badge;