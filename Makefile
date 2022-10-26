#############################
# Docker Teritory
#############################
DOCKER := docker
COMPOSE := docker-compose

dc-up:
	${COMPOSE} --compatibility up -d --remove-orphans --build

dc-up-ndp:
	${COMPOSE} --compatibility up -d --remove-orphans --no-deps

dc-down:
	${COMPOSE} down

#############################
# Application Teritory
#############################
NPM := npm

dev:
	${NPM} run dev

start:
	${NPM} start

build:
	${NPM} run build

#############################
# Typeorm Database Teritory
#############################

orsrun:
ifdef type
	${NPM} run seed:${type}
endif

orscon:
	${NPM} run seed:config

ormake:
ifdef name
	${NPM} run orm:make ${name}
endif

ormig:
ifdef type
	${NPM} run orm:${type}
endif

orlist:
	${NPM} run orm:list