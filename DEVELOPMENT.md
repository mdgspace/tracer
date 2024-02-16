# Deployment Guide

## Prerequisites
- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/engine/install/)
- [nodejs](https://nodejs.org/en/download)
- [MultiAvatar api secret Key](https://api.multiavatar.com/)
- [Github OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

## Steps

### Clone the repo
```
 git clone https://github.com/mdgspace/activity-leaderboard.git

 cd activity-leaderboard
```

### Create .env using .env.example

### Run
1. `npm ci`
2. `npm run prepare`
3. `npm run lint`
4. `npm run prettier`

### Run appplication

```
npm start
```