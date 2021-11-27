# Appointments AWS Lamdba service
Aws lamdba http api to create, get and list appointments. Appointments are stored in a DynamoDB table and include: id, date, time, name, created at least.

Code is structured as follows:
- configuration in serverless.yml
- handlers in /handlers folder
- services in /services folder
- adapters (e.g. for persistence) in /adapters folder

Handlers focus on protocol specifics and delegate main business logic processing to Services. Services use Adapters to integrate with storage etc.

Uses serverless framework to define and deploy

Typescript code and uses serverless-plugin-typescript to compile typescript code.

Unit tests written using jest

## install
`nvm use`

`npm install`

You need ot have serverless installed to deploy
`npm install -g serverless`

## tests
`npm run test`

## get appointment by id
get an appointment by id which exists in the db
`curl https://iq2u4m9d2f.execute-api.us-east-1.amazonaws.com/dev/appointments/fd59163a-d77c-4674-a7e0-eec5e13a1963`

You can also hit the function using sls invoke like so passing id as data
`sls invoke --function getAppointment --log --data '{ "pathParameters" : {"id": "b664c3b2-7f8c-409f-a93d-cb581fcd4c91"}}'`

## create appointment
create a new appointment

`curl -X POST https://iq2u4m9d2f.execute-api.us-east-1.amazonaws.com/dev/appointments --data '{ "data": {"time": "10:00:00PST", "name": "Jane Doe", "date": "12/01/2021" }}'`


## get all appointments
`curl https://iq2u4m9d2f.execute-api.us-east-1.amazonaws.com/dev/appointments`


## aws deploys
You must have serverless aws cli installed locally to run these commands

`sls deploy` - when serverless config changes (or if function changes)

`sls deploy function --function getAppointment`  - when only getAppointment function changed (faster)
