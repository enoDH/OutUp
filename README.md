# OutUp
__OutUp__ is an open source application. The idea of the project is to give a person the opportunity to create their own trainings and share them 
with other people, find a coach, or become a coach for someone.

## For developers
### The first steps
- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://www.npmjs.com/)
- Install the Angular CLI globally:
```
npm install -g @angular/cli
```

### The next step
 ``` 
 npm install 
 ```
 Set the package dependencies in the client folder
 ``` 
 npm client-install
 ```
After installing all the dependencies, you can start the project (__in the root folder__)
 ``` 
 npm run dev
 ```
__You can view all available startup commands in the package.json file__

To generate a certificate, write the command below
```
openssl genrsa -out key.pem
openssl req -new -key key.pem -subj "/CN=localhost" -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

## Changelog
Here you can see what has changed [here](https://github.com/enoDH/OutUp/blob/main/CHANGELOG.md)

## Want to Help?
If you find a bug in the code or find a better solution, you can just offer us your solution.

If you want to support this project with money, you can do it on [Patreon](https://www.patreon.com/outup).
