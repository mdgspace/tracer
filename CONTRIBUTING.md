# Contributing 
Contributions of all kind are welcomed

## Run Locally

#### Prerequisites : 

 - [Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
 - [WSL (only for windows)](https://www.oracle.com/java/technologies/downloads/)
 - [Docker](https://docs.docker.com/engine/install/)
 - [Github OAuth Application](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
    With redierect url to http://localhost:3000/login
 - [Node](https://nodejs.org/en/download)
 - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [Postgresql](https://www.postgresql.org/download/)
 - [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
 - [Jdk-17](https://openjdk.org/projects/jdk/17/)
 - [maven](https://maven.apache.org/install.html)


#### Clone the Repo
```
git clone https://github.com/mdgspace/Tracer.git
```
#### Change current folder to project folder

```
cd Tracer
```
#### Start postgres and redis servers

#### Create postgresql user, password and database

#### Create env.sh from env.sh.example



#### Run Frontend

```
source env.sh
cd frontend
# only first time to install node-modules
npm ci
npm start
```

#### Run backend

```
source env.sh
cd backend
mvn spring-boot:run -DskipTests
```

#### Testing

Tests for backend is written ./src/test Directories

#### Run backend tests

```
cd backend
mvn test
```

## Run using Docker
#### Prerequisites : 

 - [Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
 - [WSL (only for windows)](https://www.oracle.com/java/technologies/downloads/)
 - [Docker](https://docs.docker.com/engine/install/)
 - [Github OAuth Application](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
    With redierect url to http://localhost:3000/login

#### Clone the Repo
```
git clone https://github.com/mdgspace/Tracer.git
```
#### Change current folder to project folder

```
cd Tracer
```

#### Create env.list file using env.list.example

#### Run docker compose
```
docker compose up
```

## Commit messages
Please start your commits with these prefixes for better understanding among collaborators, based on the type of commit:

```
feat: (addition of a new feature)
rfac: (refactoring the code: optimization/ different logic of existing code - output doesn't change, just the way of execution changes)
docs: (documenting the code, be it readme, or extra comments)
bfix: (bug fixing)
chor: (chore - beautifying code, indents, spaces, camelcasing, changing variable names to have an appropriate meaning)
ptch: (patches - small changes in code, mainly UI, for example color of a button, increasing size of tet, etc etc)
conf: (configurational settings - changing directory structure, updating gitignore, add libraries, changing manifest etc)
About
```

Add in last of commit message (backend) or (frontend) to specify where you have done the changes

ex:
```
chor: Chnge project colour (frontend)

rfac: Get UserApi (backend)
```

## Backend API'S

API's for testing purpose can be found in [thunder-client-collection](thunder-collection_Tracer.json)