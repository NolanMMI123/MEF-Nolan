package com.monespaceformation.backend.dto;

import java.util.List;
import java.util.Map;

public class AdminDashboardSummary {
    
    // KPIs
    private KPIData kpis;
    
    // Statistiques trimestrielles
    private QuarterlyStats quarterlyStats;
    
    // Répartition par catégorie
    private List<CategoryDistribution> categoryDistribution;
    
    // Évolution mensuelle du CA
    private List<MonthlyRevenue> monthlyRevenue;
    
    // Inscriptions récentes
    private List<RecentInscription> recentInscriptions;
    
    // Alertes
    private List<Alert> alerts;
    
    // Sessions à venir
    private List<UpcomingSession> upcomingSessions;

    // Constructeurs
    public AdminDashboardSummary() {}

    // Getters et Setters
    public KPIData getKpis() { return kpis; }
    public void setKpis(KPIData kpis) { this.kpis = kpis; }

    public QuarterlyStats getQuarterlyStats() { return quarterlyStats; }
    public void setQuarterlyStats(QuarterlyStats quarterlyStats) { this.quarterlyStats = quarterlyStats; }

    public List<CategoryDistribution> getCategoryDistribution() { return categoryDistribution; }
    public void setCategoryDistribution(List<CategoryDistribution> categoryDistribution) { this.categoryDistribution = categoryDistribution; }

    public List<MonthlyRevenue> getMonthlyRevenue() { return monthlyRevenue; }
    public void setMonthlyRevenue(List<MonthlyRevenue> monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }

    public List<RecentInscription> getRecentInscriptions() { return recentInscriptions; }
    public void setRecentInscriptions(List<RecentInscription> recentInscriptions) { this.recentInscriptions = recentInscriptions; }

    public List<Alert> getAlerts() { return alerts; }
    public void setAlerts(List<Alert> alerts) { this.alerts = alerts; }

    public List<UpcomingSession> getUpcomingSessions() { return upcomingSessions; }
    public void setUpcomingSessions(List<UpcomingSession> upcomingSessions) { this.upcomingSessions = upcomingSessions; }

    // Classes internes
    public static class KPIData {
        private int inscriptionsEnCours;
        private String inscriptionsChange;
        private String caTrimestre;
        private String caChange;
        private int prochainesSessions;
        private String tauxRemplissage;
        private int attestations;
        private String attestationsChange;

        public KPIData() {}

        // Getters et Setters
        public int getInscriptionsEnCours() { return inscriptionsEnCours; }
        public void setInscriptionsEnCours(int inscriptionsEnCours) { this.inscriptionsEnCours = inscriptionsEnCours; }

        public String getInscriptionsChange() { return inscriptionsChange; }
        public void setInscriptionsChange(String inscriptionsChange) { this.inscriptionsChange = inscriptionsChange; }

        public String getCaTrimestre() { return caTrimestre; }
        public void setCaTrimestre(String caTrimestre) { this.caTrimestre = caTrimestre; }

        public String getCaChange() { return caChange; }
        public void setCaChange(String caChange) { this.caChange = caChange; }

        public int getProchainesSessions() { return prochainesSessions; }
        public void setProchainesSessions(int prochainesSessions) { this.prochainesSessions = prochainesSessions; }

        public String getTauxRemplissage() { return tauxRemplissage; }
        public void setTauxRemplissage(String tauxRemplissage) { this.tauxRemplissage = tauxRemplissage; }

        public int getAttestations() { return attestations; }
        public void setAttestations(int attestations) { this.attestations = attestations; }

        public String getAttestationsChange() { return attestationsChange; }
        public void setAttestationsChange(String attestationsChange) { this.attestationsChange = attestationsChange; }
    }

    public static class QuarterlyStats {
        private int totalInscriptions;
        private int validated;
        private int cancelled;
        private String totalRevenue;
        private String conversionRate;
        private String attendanceRate;

        public QuarterlyStats() {}

        // Getters et Setters
        public int getTotalInscriptions() { return totalInscriptions; }
        public void setTotalInscriptions(int totalInscriptions) { this.totalInscriptions = totalInscriptions; }

        public int getValidated() { return validated; }
        public void setValidated(int validated) { this.validated = validated; }

        public int getCancelled() { return cancelled; }
        public void setCancelled(int cancelled) { this.cancelled = cancelled; }

        public String getTotalRevenue() { return totalRevenue; }
        public void setTotalRevenue(String totalRevenue) { this.totalRevenue = totalRevenue; }

        public String getConversionRate() { return conversionRate; }
        public void setConversionRate(String conversionRate) { this.conversionRate = conversionRate; }

        public String getAttendanceRate() { return attendanceRate; }
        public void setAttendanceRate(String attendanceRate) { this.attendanceRate = attendanceRate; }
    }

    public static class CategoryDistribution {
        private String name;
        private int inscriptions;
        private String revenue;
        private double percentage;

        public CategoryDistribution() {}

        // Getters et Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public int getInscriptions() { return inscriptions; }
        public void setInscriptions(int inscriptions) { this.inscriptions = inscriptions; }

        public String getRevenue() { return revenue; }
        public void setRevenue(String revenue) { this.revenue = revenue; }

        public double getPercentage() { return percentage; }
        public void setPercentage(double percentage) { this.percentage = percentage; }
    }

    public static class MonthlyRevenue {
        private String month;
        private String amount;

        public MonthlyRevenue() {}

        // Getters et Setters
        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }

        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }
    }

    public static class RecentInscription {
        private String id;
        private String name;
        private String email;
        private String company;
        private String training;
        private String session;
        private String amount;
        private String status;
        private String date;
        private String avatar;

        public RecentInscription() {}

        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }

        public String getTraining() { return training; }
        public void setTraining(String training) { this.training = training; }

        public String getSession() { return session; }
        public void setSession(String session) { this.session = session; }

        public String getAmount() { return amount; }
        public void setAmount(String amount) { this.amount = amount; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }

        public String getAvatar() { return avatar; }
        public void setAvatar(String avatar) { this.avatar = avatar; }
    }

    public static class Alert {
        private String type;
        private String text;
        private String detail;

        public Alert() {}

        // Getters et Setters
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }

        public String getDetail() { return detail; }
        public void setDetail(String detail) { this.detail = detail; }
    }

    public static class UpcomingSession {
        private String title;
        private String dates;
        private int enrolled;
        private int capacity;
        private String location;

        public UpcomingSession() {}

        // Getters et Setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDates() { return dates; }
        public void setDates(String dates) { this.dates = dates; }

        public int getEnrolled() { return enrolled; }
        public void setEnrolled(int enrolled) { this.enrolled = enrolled; }

        public int getCapacity() { return capacity; }
        public void setCapacity(int capacity) { this.capacity = capacity; }

        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
    }
}

