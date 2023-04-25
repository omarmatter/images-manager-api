# images-manager-api

What does this project contain? 

 User
-  For each user, the system provides a personal data profile.
-  The user has the ability to save and manage their own photos.
-  The system grants the user the ability to create folders.
-  The user can upload an image or multiple images to a folder.
-  The user can add tags to each image.
-  The user can move an image from one folder to another.
-  The user can search for images based on tags.
-  The user can delete an image or a group of images.

## Installation

### Run Locally



Clone the project

```bash
  git clone  https://github.com/omarmatter/images-manager-api.git
```
Go to the project directory

```bash
  cd images-manager-api

```
Install dependencies

```bash
  npm install
```


Start the server

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ACCESS_TOKEN_SECRET=" access token secret jwt " `

`  DB_CONNECTION= "this base url"`

`  DB_USERNAME= "database username"`

`  DB_PASSWORD= "database password"`

`  DB_NAME= "database name"`

## Running Migrations
```command 
 npx sequelize-cli db:migrate --migrations-path db/migrations  
```
## Screenshots

[![api.png](https://i.postimg.cc/kgCnhFST/api.png)](https://postimg.cc/bs6cZn3n)


## Authors

- [Omar Matter](https://github.com/omarmatter/)



