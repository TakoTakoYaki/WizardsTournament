package com.gramdel.isbd.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "fighting_method")
public class FightingMethod {
    @Id
    @Column(name = "name")
    private String name;

    @Column(name = "vulnerability")
    private long vulnerability;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setVulnerability(long vulnerability) {
        this.vulnerability = vulnerability;
    }

    public long getVulnerability() {
        return vulnerability;
    }
}
