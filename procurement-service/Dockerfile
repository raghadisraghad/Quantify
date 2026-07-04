# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY procurement-service/procurement-service.csproj procurement-service/
RUN dotnet restore procurement-service/procurement-service.csproj

COPY . .
WORKDIR /src/procurement-service
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "procurement-service.dll"]