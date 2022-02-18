# SalesBlink 

Live project
https://salesblink.herokuapp.com/#/

### SUPER USER LOGIN DETAILS
    Email: admin@blink.com
    Password: blink

Project quick documentation

## Installation


1. Clone project:

  - Clone repo `https://github.com/horizonltd/salesblinkpost.git`

2. Setup project settings.py for AWS RDS and S3 Bucket:

## Make sure that you have all env variables AWS S3 BUCKET

    AWS_QUERYSTRING_AUTH = False
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = 'blinkdev'

3. Setup project settings.py for AWS RDS:
## Make sure that RDS DATABASE CONFIGURATION IS SET UNDER DATABASE SETTING

    DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'blinkdb',
           'USER': 'blink',
           'PASSWORD': config('DB_PASSWORD'),
           'HOST': config('HOST_NAME'),
           'PORT': '5432'
       }
    }

4. Run project:
    `python manage.py runserver 0.0.0.0:8000`
    `npm start`
   
5. There should now be servers running on :
  - [http://localhost:8000/api/](http://localhost:8000/api/) is the Django (API) app
  - [http://localhost:3000](http://localhost:3000) is the React (UI) app



### TRY RUNNING IF FAILED AND RECHECK settings.py for any misconfiguration

