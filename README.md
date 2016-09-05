# docs-browser
Browse and read documents

## How to start
Node and npm are assumed to be installed
#### clone the repo
```
git clone git@github.com:mikedanylov/docs-browser.git
```
#### install node packages
```
cd docs-browser
npm install
```
#### run the app
```
npm start
```
## APIs
Currently app is making a few calls
```
POST localhost:3000/login
GET  localhost:3000/documents
GET  localhost:3000/document/:id
```
Also it is possible to highlight text in the document by supplying query parameter `search`
```
GET  localhost:3000/document/:id?search=query
```
Domain name is maintained in `app/constants.ts`
```
export const DOMAIN = 'http://localhost:3000';
```