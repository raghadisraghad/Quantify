# Procurement Service

This service is built with ASP.NET Core Web API 8.0.

## Table of Contents

- [Environment File](#environment-file)
- [Dependencies Installation](#dependencies-installation)
- [Development Server](#development-server)
- [Building](#building)
- [Running the Application](#running-the-application)
- [Classes Diagram](#classes-diagram)
* [Database Schema ERD](#database-schema-erd)

## Environment File

Create the environment file from the example template:

```bash
cp .env.example .env
```

Update the values in `.env` as needed.

## Dependencies Installation

Restore project dependencies:

```bash
dotnet restore
```

## Development Server

Start the application:

```bash
dotnet run
```

Once the application is running, it will be available at:

```text
http://localhost:8085
```

## Building

Build the project:

```bash
dotnet build
```

The compiled output will be generated in the:

```text
bin/
```

directory.

## Running the Application

Run the application:

```bash
dotnet run
```

Or publish and run the compiled application:

```bash
dotnet publish -c Release
```

```bash
dotnet ./bin/Release/net8.0/ProcurementService.dll
```

> Replace `ProcurementService.dll` with the actual generated DLL filename if different.

## Classes Diagram

```mermaid
classDiagram

class Supplier {
    +String id [PK]
    +String businessId [FK]
    +String name
    +String contactName
    +String email
    +String phone
    +Boolean isActive
    +LocalDateTime createdAt
}

class PurchaseOrder {
    +String id [PK]
    +String businessId [FK]
    +String supplierId [FK]
    +POStatus status
    +Decimal totalCostMAD
    +LocalDateTime orderedAt
    +LocalDateTime receivedAt
    +String notes
}

class PurchaseOrderItem {
    +String id [PK]
    +String purchaseOrderId [FK]
    +String ingredientId
    +Decimal quantityOrdered
    +Decimal unitPriceCost
}

class POStatus {
    <<enumeration>>
    DRAFT
    SENT
    RECEIVED
    CANCELLED
}

Supplier "1" --> "*" PurchaseOrder : supplies
PurchaseOrder "1" --> "*" PurchaseOrderItem : contains
PurchaseOrder --> POStatus
```

### Notes

- `POStatus`: `DRAFT`, `SENT`, `RECEIVED`, `CANCELLED`
- Each `Supplier` can have multiple purchase orders.
- Each `PurchaseOrder` can contain multiple items.
- `businessId` is used to enforce tenant isolation between businesses.
- Receiving a purchase order may trigger inventory stock updates.
- `(+)` : `Public method`
- `(-)` : `Private method`
- `(#)` : `Protected method`
- `(~)` : `Package/Internal method`

## Database Schema ERD

```mermaid
erDiagram
    SUPPLIER ||--o{ PURCHASE_ORDER : "supplies"
    PURCHASE_ORDER ||--o{ PURCHASE_ORDER_ITEM : "contains"

    SUPPLIER {
        string id PK
        string businessId FK
        string name
        string contactName
        string email
        string phone
        boolean isActive
        datetime createdAt
    }

    PURCHASE_ORDER {
        string id PK
        string businessId FK
        string supplierId FK
        string status
        decimal totalCostMAD
        datetime orderedAt
        datetime receivedAt
        string notes
    }

    PURCHASE_ORDER_ITEM {
        string id PK
        string purchaseOrderId FK
        string ingredientId
        decimal quantityOrdered
        decimal unitPriceCost
    }
```
