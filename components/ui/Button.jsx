import React from "react";

const Button = ({ variant = "default", size = "default", className = "", onClick, children }) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
    const variantStyles = {
        default: "bg-[#e9b30e] text-[#1e1e24] hover:bg-[#d4a00c]",
        outline: "border border-gray-600 text-white hover:bg-gray-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        success: "bg-green-600 text-white hover:bg-green-700",
    };
    const sizeStyles = {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 py-2",
    };

    const finalStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return <button className={finalStyles} onClick={onClick}>{children}</button>;
};

export default Button;