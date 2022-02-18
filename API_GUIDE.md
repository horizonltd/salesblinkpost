

## Core url: http://127.0.0.1:8000/api/

By using the following endpoint, URL is formed by baseurl + endpoint and API communication is performed.


## Main endpoints

| Endpoint name |  Link  | Method |  Purpose |  
|---|---|---|---|---|---|---|
 
|  SignIn | /user/login | POST | For login into system |  
|  SignUp | /user/registration | POST | For registration |     
|  Update profile | /users/id/profile/ | PATCH | Change user profile |    
|  Users Information | /users/profile/  | GET | Get users information |    
|  Post | /posts/create/  | POST | Create Post |     
|  All Post List | /posts/  | GET | Get All Posts |    
|  Update Post | /post/update/  | PATCH | Update Post |    
|  Delete Post | /post/id/  | DELETE | Delete Post |    
|  Add Comment | /post/id/comment/  | POST | Create comment |    
  
 

##### Sample response list for Whole project:

1. HTTP_201_CREATED
2. HTTP_400_BAD_REQUEST
3. HTTP_401_UNAUTHORIZED
4. HTTP_403_FORBIDDEN
5. HTTP_415_UNSUPPORTED_MEDIA_TYPE
6. HTTP_409_CONFLICT
7. HTTP_404_NOT_FOUND
8. HTTP_204_NO_CONTENT
9. HTTP_500_INTERNAL_SERVER_ERROR
10. HTTP_200_OK



### HTTP REQUEST :  **POST  /login**

###### params
```json
{
	"email" : "admin@blink.com",
	"password" : "blink"
}
```

| parameter | is required | comment |
| :---------: | :---: | :-----------: | :-------: | :----------- |
| email       | true | |
| password    | true | |


###### output

### possible response list:

1. HTTP_200_OK ----- success
2. HTTP_400_BAD_REQUEST ----- Required fields not given 

``` json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0NTI5NDgzOCwianRpIjoiY2MwMWU4OWZhMGU3NGFkMmFmY2IxOWZiMDM2Njc2NWIiLCJ1c2VyX2lkIjoxfQ.uKoL4IzE-k23iaNL8O1p4ao7JLBMvE2upxCkD2DTXjI",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1NjQwNDM4LCJqdGkiOiI1ZWM2MDZhNmFiZjc0YjMwOTc1OWFjMTU5MDdlMDY3MiIsInVzZXJfaWQiOjF9.zrvxl6WoYZfJLISrlH3lyiuuDP4pcz8bW7ehDk9cMGs",
    "id": 1,
    "_id": 1,
    "username": "admin@blink.com",
    "email": "admin@blink.com",
    "name": "Blink Admin",
    "isAdmin": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1NjQwNDM4LCJqdGkiOiJjOTJjNDI0ZGVjOWI0ZTA4YmYxMWMwZGYxMmI2OGM5NyIsInVzZXJfaWQiOjF9.1jr20xK3Om4CLMGZa9h_8er6-TAbMAfoddDGWyQqLzM"
}
```

### HTTP REQUEST :  **POST  /user/register** 

###### params
````
{
    "username": "admin@gmail.com",
    "email": "admin@gmail.com",
    "name": "admin@gmail.com",
}
````

### possible response list:

1. HTTP_200_OK ----- success
2. HTTP_400_BAD_REQUEST ----- Required fields not given 

``` json
{
    "id": 3,
    "_id": 3,
    "username": "admin@gmail.com",
    "email": "admin@gmail.com",
    "name": "admin@gmail.com",
    "isAdmin": false,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1NjQwNTExLCJqdGkiOiI5NmMwNDE2OGIyNWY0NmY4YjY0ZTZhNDY3NDQ4NzdjNSIsInVzZXJfaWQiOjN9.BIFsUB8XDzJ03KYcACBU7-9hRhybHUIlbPmd99WJRYw"
}
```


### HTTP REQUEST :  **POST  /post/create/** 


##### params
````
{
    "user": 1,
    "title": "blink",
    "slug": "blink",
    "content": "blink"
}
````

### possible response list:

1. HTTP_200_OK ----- success
2. HTTP_400_BAD_REQUEST ----- Required fields not given 

``` json
{
    "id": "095bd862-c345-47c6-a0e4-ce66df847291",
    "comments": [],
    "title": "sample title",
    "slug": "sample slug",
    "content": "sample content",
    "image": "/images/placeholder.png",
    "created_on": "2022-02-18T09:47:36.675149Z",
    "user": 2
}
```
