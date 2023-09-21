# Dependencies
* Entity Framework
* Npgsql

# How to run locally
Install dotnet 6 & docker.

* dotnet tool install --global dotnet-ef
* docker run --name sensor-pgs -e POSTGRES_PASSWORD=mysecretpassword -d postgres
* dotnet ef database update
* dotnet run
