# FIRSTLY PASTE 'winget install GnuWin32.Make' in terminal
# SECONDLY ADD C:\Program Files (x86)\GnuWin32\bin to PATH

# HOW TO USE: just type 'make up' in CLI to spin both kafka and postgres

#Should there be a file named 'up' -> use '.PHONY: up' instead, or everything listed here
.PHONY: up kafka db

all:
	@docker info >/dev/null 2>&1 || docker desktop start
	docker compose up kafka postgres grafana prometheus

monitor:
	@docker info >/dev/null 2>&1 || docker desktop start
	docker compose up grafana prometheus

down:
	docker compose down
	docker ps

env:
	powershell -Command "Copy-Item user-service/.env.example user-service/.env"
	powershell -Command "Copy-Item sales-service/.env.example sales-service/.env"
	powershell -Command "Copy-Item notification-service/.env.example notification-service/.env"
	powershell -Command "Copy-Item frontend/.env.example frontend/.env"
	powershell -Command "Copy-Item discovery_service/.env.example discovery_service/.env"
	powershell -Command "Copy-Item api_gateway_service/.env.example api_gateway_service/.env"

# makefile:XX: *** missing separator. ---> this means you should copy paste Tab space from one of the existing commands and apply to XX line