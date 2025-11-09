"use client";

import ButtonWithAdornment from "@/components/form-elements/button-with-adornment";

import { deleteCookie } from "cookies-next";

export default function Header() {
  const handleLogout = () => {
    localStorage.clear();
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    window.location.href = "/dashboard";
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
        <div className="flex items-center space-x-3">
          <ButtonWithAdornment
            onClick={handleLogout}
            variant="outline"
            label="Logout"
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}
