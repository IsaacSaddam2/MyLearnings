## Automate everything
- code testing
- integratation
- deployement
- environment provisioning

The range of DevOps tools is growing

### Microsoft bundles these services into a suite of team tools (Devops suite)

### Azure Boards
1. Kanban boards
2. Backlogs
3. Team Dashboards
4. Reporting

### DevopsPrinciples
- shared planning
- shared code base
- automated deployement
- test-driven techniques
- continuous integration

### Devops suits
- Microsoft
- Github

### Other names of Azure Devops

- Visual studio Team services
- Visual studio online'
- Team Foundation Server

### Azure and Azure Azure Devops
Any language, any platform, any cloud
- Azure contains all services provided by microsoft (cloud databases,serverless function, configure virtual machines) (web.portal.com)
- Azure Devops is separate cloud base toolset to enhance team workflows (alrogether is different portAl) (dev.azure.com)

### Azure Devops Suit Services

- Azure Boards (just like jira planning and tracking work)
- Azure Repos ( shared integrated source system just like gihub)
- Azure Pipelines (services to automate ur build, integration, deployement)
- Azure TestPlans ( to automate test cases)
- Azure Artifacts (tomanage dependencies in ur codebase(npm nuget))

### Azure Devops are in cloud to Access

- Azure DevOps web portal
- Azure Devops command line ( install the azure cli,)  
- Visual studio and vs code (they integrated with devops services)

## commands
- az extension add --name azure-devops  // adds the azure devops cli, install azure cli first
- az repos |create --name "example"    // creates repo
- az repos list --output table  // to show all repos

### Pricing
- basic plan 6$ per month  // 6 members maximum 
- got azure devops services pricing

## Notes
- Usaally Azure devops store ur code in their server
- Azure Devops server is a licensed used to store in ur provate server

### Steps to use Devops
- login to dev.azure.com
- create organization
- organization setting you can mage users, billings etc

#### Azure devops demo generator
- used to generate demo board, pipelines, repos etc
- give permissions
- create project name (give as First project)
- select organizations
- selected template ( that support agile ) 
- My Health Clinic template
- download required extensions

### View the generated project
- we get demi data in all services

### How to add users using microfost account
- organization settings > users > add > type user email
- you can give access level (stakeholder can only add work items in board)
- project >project settings> teams
- click on any team >add> type user email

### Azure boards

- work items
- Boards
- Sprints
- Backlogs
- Queries 

### Azure Repos Git

- Git
- Team Foundation Version Control
- its like a github 

### Git workflow

- Create repo on web portal
- Team members clone repo to local
- create branch for new work
- commit changes to local branch
- team members submit, revuiew and approve pr

### Azure Pipelines

## Continous Integration (CI) 
- process of automating build and test
- Build pipeline (triggered when a new code is commited to shared version control system)

## Continous Delivery (CD)
- process of automating delivery
- Release pipeline

### Code integration 
- adding new code and checking its working correctly
- use a testing system to bundle tests together

## Code flow

- Commit code
- merge code
- Build
- test

### Release pipeline

- Webapplication, deployed to production environment perhaps running on  Azure App Service
- Microservices, web front end, data base updates
- Blue-green pattern
    Roll out version in staggered cadence
    The previous version is on a blue server, ant the new one is on green server (used fo load balancing)
- Feature Flag Pattern
    Features are deployed to production, but not available to all users

### windows OS release

Continous Integration Done
- Ring A
- Ring B
.
.
Ring etc

### Pipelines
- Pipelines (Build pipeline)
- Environments
- Releases ( release pipeline )

# Pipeline (build pipeline)

- click pipeline > edit > Triggers > Continous integration trigger enabled > select which branch should trigger this CI pipeline
- It can be configures writing a yaml script
- Select agent  

## create an Azure App Service

- open azure portal
- create app service
- app service is used to host our appliction in a server

## connecting azure subscription to project
- Project settings > Service connections > create service connection > Azure Reource Manager (ARm) > sign in with ur credentions
- Give Subscription Id, reource group
- Give Service connection name 

### Creating a new pipeline

- add new pipline > classic editor > Azure Repos Git | Project name | repository | branch>continue
- Azure pipelines comes with lot of templates
- to build and deploy use azure web app for asp.ne template (both build and deploy app)
- for this u need to give information about app service(this is where we deploy our code) 

## Azure web app deploy
- Give Appservice name and Azure subscription
- In Agent Specification use windows-2019

## Azure web app deploy: Appservice name
- give apptype as (Web App on windows)
- save the pipeline

## Add astep in Agent
- add use .net core sdk 3.1

## To run the pipeline
- checkin in main brnch
- this should trigger the pipeline that we have added to build and deploy

#### Creating Separate pipeline

#### Extensions
- code search
- persona