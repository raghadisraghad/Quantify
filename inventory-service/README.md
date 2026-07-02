# Inventory Service

This service is built with ASP.NET Core Web API 8.0.

## Table of Contents

* [Environment File](#environment-file)
* [Dependencies Installation](#dependencies-installation)
* [Development Server](#development-server)
* [Building](#building)
* [Running the Application](#running-the-application)
* [API Documentation](#api-documentation)
* [Classes Diagram](#classes-diagram)
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
http://localhost:8083
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
dotnet ./bin/Release/net8.0/InventoryService.dll
```

> Replace `InventoryService.dll` with the actual generated DLL filename if different.

## API Documentation

If Swagger is enabled, it can be accessed at:

```text
http://localhost:8083/swagger
```

## Classes Diagram

```mermaid
classDiagram

class Ingredient {
    +String id [PK]
    +String businessId [FK]
    +String name
    +String picture
    +String unit
    +Decimal costPerUnit
    +Decimal currentQuantity
    +Decimal minThreshold
}

class Recipe {
    +String id [PK]
    +String businessId [FK]
    +String name
    +String picture
    +String categoryId [FK]
    +Decimal price
    +RecipeStatus status
}

class Category {
    +String id [PK]
    +String businessId [FK]
    +String name
}

class RecipeItem {
    +String recipeId [PK, FK]
    +String ingredientId [PK, FK]
    +Decimal quantity
}

class StockMovement {
    +String id [PK]
    +MovementType type
    +Decimal quantity
    +LocalDateTime date
    +String ingredientId [FK]
}

class RecipeStatus {
    <<enumeration>>
    ACTIVE
    INACTIVE
}

class MovementType {
    <<enumeration>>
    IN
    OUT
}

Category "1" --> "*" Recipe
Recipe "1" --> "*" RecipeItem
Ingredient "1" --> "*" RecipeItem
Ingredient "1" --> "*" StockMovement

Recipe --> RecipeStatus
StockMovement --> MovementType
```

### Notes

- `RecipeStatus`: `ACTIVE`, `INACTIVE`
- `MovementType`: `IN`, `OUT`
- Each business manages its own ingredients, recipes, and categories through `businessId`.
- Stock movements track inventory increases and decreases.
- Recipes are composed of one or more ingredients through `RecipeItem`.
- `(+)` : `Public method`
- `(-)` : `Private method`
- `(#)` : `Protected method`
- `(~)` : `Package/Internal method`

## Database Schema ERD

```mermaid
erDiagram
    CATEGORY ||--o{ RECIPE : "has"
    RECIPE ||--o{ RECIPE_ITEM : "contains"
    INGREDIENT ||--o{ RECIPE_ITEM : "used in"
    INGREDIENT ||--o{ STOCK_MOVEMENT : "tracks"

    CATEGORY {
        string id
        string businessId
        string name
    }

    RECIPE {
        string id
        string businessId
        string name
        string picture
        string categoryId
        decimal price
        string status
    }

    INGREDIENT {
        string id
        string businessId
        string name
        string picture
        string unit
        decimal costPerUnit
        decimal currentQuantity
        decimal minThreshold
    }

    RECIPE_ITEM {
        string recipeId
        string ingredientId
        decimal quantity
    }

    STOCK_MOVEMENT {
        string id
        string type
        decimal quantity
        datetime date
        string ingredientId
    }
```