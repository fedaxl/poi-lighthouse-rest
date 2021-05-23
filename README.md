# poi-lighthouses v.2

Enterprise Web Development - Assignment 2<br />
Student 20091413<br />
College: WIT

## Description
This application will allow a user to login/signup to an account, add and manage points of interests, add images etc. 
The admin user will be able to view all the other users accounts and manage all the POI inserted.
<br />

Glitch: https://maneskin-lighthouse.glitch.me/
Heroku: https://poi-lighthouse-rest.herokuapp.com/

### v.1.1
Authentation/Cookies/Session (@hapi/cookie)<br />
Images (Upload/View) (cloudinary)<br />
SignUp/Login/Delete account <br />
Simple User Admin Dashboard <br />
Add POI: Name, Description, Category, Location, Image <br />
Update/Delete POI<br />
Organize POIs into categories <br />
Manage POI images <br />

### v.1.2
API implementation
JWT
Bicrypt

## Technology Stack
Name|Specification|
|---|--------|
|UI|handlebars, uikit|
|Components|handlebars, mongoose, dotenv, mais-moongoose-seeder, cloudinary|
|Framework|hapi, inert, vision, cookie, boom|
|Platforms|node, mongodb, cloudinary|
|Infrastructure|heroku, cloudatlas, glitch|
<br />

To try the app, you will have to install the following:
```
npm install @hapi/hapi
npm install @hapi/inert
npm install @hapi/vision
npm install handlebars
npm install handlebars
npm install cloudinary
npm install mongoose
npm install dotenv
```
See layout.hbs for UIkit and Font Awesome initialisation


## Author
Federica Fiorenza
