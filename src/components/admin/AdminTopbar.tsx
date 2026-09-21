
"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

type AdminUser = {
  name?: string;
  email?: string;
  role?: string;
};

export default function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          type="button"
          className="admin-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="admin-topbar-logo">
          <Image
            src="/logo/logo.jpeg"
            alt="Touchwood"
            width={115}
            height={44}
            priority
          />
        </div>
      </div>

      <div className="admin-profile">
        <div className="admin-profile-info">
          <span className="admin-profile-name">
            {user?.name || "Admin"}
          </span>

          <span className="admin-profile-role">
            {user?.role === "admin" ? "Administrator" : "Admin"}
          </span>
        </div>

        <div className="admin-profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
}

