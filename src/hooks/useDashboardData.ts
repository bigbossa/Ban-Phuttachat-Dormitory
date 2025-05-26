import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

export interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  vacantRooms: number;
  pendingRepairs: number;
  monthlyRevenue: number;
  announcements: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
}

export function useDashboardData() {
  const { t } = useLanguage();

  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 50,
    occupiedRooms: 42,
    vacantRooms: 8,
    pendingRepairs: 3,
    monthlyRevenue: 175000,
    announcements: 2,
  });
// Sample monthly data
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([
    { month: t("month.Jan"), revenue: 155000 },
    { month: t("month.Feb"), revenue: 160000 },
    { month: t("month.Mar"), revenue: 165000 },
    { month: t("month.Apr"), revenue: 170000 },
    { month: t("month.May"), revenue: 175000 },
    { month: t("month.Jun"), revenue: 175000 },
  ]);
// Function to format currency in Thai Baht
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return {
    stats,
    monthlyData,
    formatCurrency,
  };
}
