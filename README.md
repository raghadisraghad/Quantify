# Quantify

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Business Capabilities](#business-capabilities)

  * [Inventory Management](#inventory-management)
  * [Menu Management](#menu-management)
  * [Procurement Management](#procurement-management)
  * [Sales Management](#sales-management)
  * [Notifications](#notifications)
  * [Analytics](#analytics)
* [Architecture](#architecture)

  * [Frontend](#frontend)
  * [Backend Services](#backend-services)
  * [Infrastructure](#infrastructure)
* [Database Architecture](#database-architecture)
* [Event-Driven Communication](#event-driven-communication)
* [Planned AI Features](#planned-ai-features)
* [Monitoring (Planned)](#monitoring-planned)
* [Target Businesses](#target-businesses)
* [Project Status](#project-status)

---

## Overview

Quantify is a microservices-based inventory, procurement, sales, and analytics platform designed for restaurants, cafés, bakeries, and similar businesses.

The platform helps businesses manage ingredients, menus, inventory levels, procurement operations, sales tracking, and financial insights from a centralized system.

Users can manage their products and recipes by defining which ingredients are required for each menu item. As sales occur, inventory levels are automatically updated, allowing businesses to maintain accurate stock visibility and receive restocking notifications before shortages occur.

Future AI-powered analytics will provide intelligent inventory forecasting, demand prediction, and automated restocking recommendations based on historical consumption and sales patterns.

---

## Features

* Ingredient management
* Menu and recipe management
* Inventory tracking
* Procurement management
* Sales management
* User and business management
* Real-time stock updates
* Low-stock notifications
* Financial and sales analytics
* Event-driven architecture using Kafka
* Service discovery and API gateway
* Independent databases per service
* Future AI-powered forecasting and recommendations

---

## Business Capabilities

### Inventory Management

* Track ingredient quantities in real time
* Add custom ingredients not available in the default catalog
* Monitor stock movements
* Prevent inventory shortages

### Menu Management

* Create and manage menu items
* Define ingredient requirements for each menu item
* Automatically deduct ingredients after sales

### Procurement Management

* Manage supplier purchases
* Track procurement operations
* Calculate replenishment requirements

### Sales Management

* Record sales transactions
* Track revenue and business performance
* Analyze product demand

### Notifications

* Receive low-stock alerts
* Receive restocking reminders
* Future AI-powered predictive notifications

### Analytics

* Inventory analytics
* Sales analytics
* Revenue analytics
* Procurement analytics
* Forecasting and reporting

---

## Architecture

### Frontend

* Angular

### Backend Services

| Service              | Technology           |
| -------------------- | -------------------- |
| API Gateway          | Spring Cloud Gateway |
| Discovery Service    | Netflix Eureka       |
| User Service         | Spring Boot          |
| Sales Service        | Spring Boot          |
| Inventory Service    | ASP.NET Core         |
| Procurement Service  | ASP.NET Core         |
| Notification Service | NestJS               |
| Analytics Service    | Python               |

### Infrastructure

| Component              | Technology           |
| ---------------------- | -------------------- |
| Database               | PostgreSQL           |
| Messaging              | Apache Kafka         |
| Service Discovery      | Eureka               |
| API Gateway            | Spring Cloud Gateway |
| Monitoring *(planned)* | Prometheus           |
| Dashboards *(planned)* | Grafana              |
| Containerization       | Docker               |

---

## Database Architecture

Each microservice owns and manages its own PostgreSQL database.

This approach ensures:

* Service independence
* Loose coupling
* Independent deployment
* Better scalability
* Improved fault isolation

---

## Event-Driven Communication

Services communicate asynchronously through Apache Kafka.

Examples include:

* Sales events updating inventory
* Inventory events triggering notifications
* Procurement events updating stock levels
* Analytics consuming operational events for reporting and forecasting

---

## Planned AI Features

The Analytics Service will incorporate AI capabilities to provide:

* Demand forecasting
* Inventory consumption prediction
* Smart restocking recommendations
* Predicted stock depletion dates
* Revenue trend analysis
* Seasonal demand detection
* Procurement optimization

The system will analyze:

* Historical sales
* Inventory consumption
* Procurement history
* Revenue trends
* Product popularity

to recommend:

* What to reorder
* How much to reorder
* When to reorder

before stock shortages occur.

---

## Monitoring (Planned)

Prometheus and Grafana will be integrated to provide:

* Service health monitoring
* Performance metrics
* Infrastructure monitoring
* Business dashboards
* Kafka monitoring
* Database monitoring

---

## Target Businesses

* Restaurants
* Cafés
* Bakeries
* Fast-food businesses
* Food production businesses
* Catering companies
* Similar inventory-driven operations

---

## Project Status

Quantify is currently under active development.

Future milestones include:

* Completion of all core microservices
* Full Kafka integration
* Monitoring and observability stack
* AI-powered forecasting engine
* Advanced analytics dashboards
* Production deployment
