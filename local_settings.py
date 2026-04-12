#This file contains all information related to admin credentials for email,
# db etc.

# For development: Use console backend to print emails to terminal
# For production: Configure with your email service

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'YOUR HOST'
EMAIL_PORT = 'YOUR HOST PORT'
EMAIL_HOST_USER = 'Your mail'
EMAIL_HOST_PASSWORD = 'Your Password'
EMAIL_USE_TLS = True
SENDER_EMAIL = 'YOUR PRODUCTION MAIL'