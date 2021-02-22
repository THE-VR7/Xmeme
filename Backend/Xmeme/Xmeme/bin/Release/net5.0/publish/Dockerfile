
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
COPY ./ ./


FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
COPY --from=build /app/out .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Xmeme.dll

