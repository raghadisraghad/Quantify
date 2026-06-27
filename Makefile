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

kafka:
	docker compose up kafka

db:
	docker compose up postgres

net:
	docker network list

# makefile:XX: *** missing separator. ---> this means you should copy paste Tab space from one of the existing commands and apply to XX line