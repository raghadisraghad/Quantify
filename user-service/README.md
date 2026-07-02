# User Service

This service is built with Spring Boot and JDK 25.

## Table of Contents

- [Environment File](#environment-file)
- [Dependencies Installation](#dependencies-installation)
- [Development Server](#development-server)
- [Building](#building)
- [Running the JAR](#running-the-jar)
- [Classes Diagram](#classes-diagram)
* [Database Schema ERD](#database-schema-erd)

## Environment File

Create the environment file from the example template:

```bash
cp .env.example .env
```

Update the values in `.env` as needed.

## Dependencies Installation

Install dependencies and download Maven packages:

```bash
mvn clean install
```

## Development Server

Start the application:

```bash
mvn spring-boot:run
```

Once the application is running, it will be available at:

```text
http://localhost:8083
```

## Building

Build the project:

```bash
mvn clean package
```

The generated JAR file will be located in:

```text
target/
```

## Running the JAR

Run the generated JAR file:

```bash
java -jar target/user-service-25.jar
```

> Replace `user-service-25.jar` with the actual generated JAR filename if different.

## Classes Diagram

```mermaid
classDiagram

class Business {
    +String id [PK]
    +String name
    +String ownerEmail
    +String passwordHash
    +BusinessType type
    +Boolean isActive
    +LocalDateTime createdAt
}

class User {
    +String id [PK]
    +String businessId [FK]
    +String name
    +String pinCodeHash
    +UserRole role
    +Boolean isActive
    +LocalDateTime createdAt
}

class BusinessType {
    <<enumeration>>
    RESTAURANT
    BAKERY
    CAFE
}

class UserRole {
    <<enumeration>>
    OWNER
    MANAGER
    CASHIER
}

Business "1" --> "*" User : owns

Business --> BusinessType
User --> UserRole
```

### Notes

- `BusinessType`: `RESTAURANT`, `BAKERY`, `CAFE`
- `UserRole`: `OWNER`, `MANAGER`, `CASHIER`
- Each `Business` can have multiple `User` accounts.
- Users belong to a single business tenant.
- `(+)` : `Public method`
- `(-)` : `Private method`
- `(#)` : `Protected method`
- `(~)` : `Package/Internal method`

## Database Schema ERD

```mermaid
erDiagram
    BUSINESS ||--o{ USER : "owns"

    BUSINESS {
        string id PK
        string name
        string ownerEmail
        string passwordHash
        string type
        boolean isActive
        datetime createdAt
    }

    USER {
        string id PK
        string businessId FK
        string name
        string pinCodeHash
        string role
        boolean isActive
        datetime createdAt
    }
```
