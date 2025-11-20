import {
  Wallet,
  LayoutDashboard,
  Briefcase,
  User,
  PlusCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { User as UserType } from "../App";

interface HeaderProps {
  user: UserType;
  currentPage: string;
  onNavigate: (
    page: "marketplace" | "post-job" | "dashboard" | "profile",
  ) => void;
}

export function Header({
  user,
  currentPage,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg" />
              <span className="font-semibold">
                DecentraWork
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant={
                  currentPage === "marketplace"
                    ? "default"
                    : "ghost"
                }
                onClick={() => onNavigate("marketplace")}
                className="gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Marketplace
              </Button>

              {user.role === "provider" && (
                <Button
                  variant={
                    currentPage === "post-job"
                      ? "default"
                      : "ghost"
                  }
                  onClick={() => onNavigate("post-job")}
                  className="gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Post Job
                </Button>
              )}

              <Button
                variant={
                  currentPage === "dashboard"
                    ? "default"
                    : "ghost"
                }
                onClick={() => onNavigate("dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
                {user.kycVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 border-green-200"
                  >
                    KYC Verified
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="text-xs mt-1">
                {user.role === "provider"
                  ? "Job Provider"
                  : "Bidder"}
              </Badge>
            </div>

            <Button
              variant="outline"
              onClick={() => onNavigate("profile")}
              className="gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-mono hidden lg:inline">
                {user.address.slice(0, 6)}...
                {user.address.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}