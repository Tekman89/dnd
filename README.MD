# Important
> To generate a certificate run 
1. `openssl req \
       -newkey rsa:2048 -nodes -keyout domain.key \
       -x509 -days 365 -out domain.crt`

DnD server is in development, 

# Goals (in no particular order): 

1. Generate dynamic dungeons.
1. Keep initiative tracking for encounters.
1. Host campaigns for DM's and Players,
1. Allow DM's to see and control their Players PC, (only those that exist in their campaign)
1. More...


## Technologies: 
1. Hapi.js
1. Objection
1. Knex.js
1. Node.js


> Usage of MVC to separate responsibilities.
