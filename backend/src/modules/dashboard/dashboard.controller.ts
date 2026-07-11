import { Controller, Get, Query } from "@nestjs/common";
import { DashboardService } from "./dashboard.service.js";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get("summary")
  summary() {
    return this.dashboard.summary();
  }

  @Get("revenue-chart")
  revenueChart(@Query("months") months?: string) {
    return this.dashboard.revenueChart(months);
  }

  @Get("recent-activity")
  recentActivity() {
    return this.dashboard.recentActivity();
  }

  @Get("upcoming-tasks")
  upcomingTasks() {
    return this.dashboard.upcomingTasks();
  }
}
