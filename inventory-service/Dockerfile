FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY inventory-service/inventory-service.csproj inventory-service/
RUN dotnet restore inventory-service/inventory-service.csproj

COPY . .
WORKDIR /src/inventory-service
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "inventory-service.dll"]