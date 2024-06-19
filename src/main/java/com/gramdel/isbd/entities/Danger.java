package com.gramdel.isbd.entities;

import javax.persistence.*;

@Entity
@Table(name = "danger")
public class Danger {
    @Id
    @Column(name = "name")
    private String name;

    @Column(name = "meeting_chance")
    private double meetingChance;

    @Column(name = "escaping_chance")
    private double escapingChance;

    public String getName() {
        return name;
    }

    public double getMeetingChance() {
        return meetingChance;
    }

    public double getEscapingChance() {
        return escapingChance;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMeetingChance(double meetingChance) {
        this.meetingChance = meetingChance;
    }

    public void setEscapingChance(double escapingChance) {
        this.escapingChance = escapingChance;
    }
}