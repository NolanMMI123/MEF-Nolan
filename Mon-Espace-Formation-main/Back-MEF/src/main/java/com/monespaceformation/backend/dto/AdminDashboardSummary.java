package com.monespaceformation.backend.dto;
import lombok.Data;

@Data
public class AdminDashboardSummary {
    private int totalInscriptions;
    private double totalRevenue;
    private int upcomingSessions;
    private double registrationTrend;
    private double revenueTrend;
    private double fillRate;
}
