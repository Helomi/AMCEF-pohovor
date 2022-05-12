##Inštalácia

Požiadávky:
- NODE.js 16.14.2
- PostgreSQL

Optional:
- Docker

Celí program bol postavený na DB PostgreSQL.\
Sequelize podporuje defaultne aj iné DB (mysql, mariadb...) \
tie ale uživateľ užíva na vlastné riziko

Inštalácia:
```npm install```

Vytvorte súbor .env
```
DEV_POSTGRESQL_URL = 'postgres://USERNAME:PASSWORD@YOUR_DB_DOMAIN:PORT/DB_NAME'
PROD_POSTGRESQL_URL = 'postgres://USERNAME:PASSWORD@YOUR_DB_DOMAIN:PORT/DB_NAME'
JWT_SECRET = 'YOUR_SECRET_JWT_TOKEN'
```

Následne už len stačí aplikáciu spustiť s pomocou príkazov uložených v package.json
Všetky tabuľky (ak neexistujú) aj vzťahy sú automaticky generované pri spustení aplikácie!






***
##Čas strávený na projekte:
- 15 min. Project initialization
- 15 min. zmysluplný DB model
- 30 min. Vytvorenie modelov, vytvorenie vzťahov medzi nimi...
- 50 min. Predvytvorenie endpointov, Vytvorenie validačného middleware
- 4 hod. Gettter todoitem, todoitems, todolist, todolists, Post todolist, passport implementácia JWT, Login
- 1 hod. Dokončenie delete, patch, menšia úprava modelov, úprava už navrhnutých endpointov
- 80 min. Dokončenie delete, patch, post pre todoItems, Doplnenie kontroli vstupných parametrov, zjednotenie názvov
- 20 min. Dokončenie pridávania uživateľov do zoznamov
- 15 min. Doplnenie registrácie, Oprava modelu (username, email unique)
- 15 min. Doplnenie gettra na 1 používateľa a jemu priradené Listy a Itemy
- 15 min. Refactoring, zlúčenie názvov premenných
- 15 min. Doplnenie autentifikácie
- 15 min. Refactoring, zkrášlenie kódu
- 120 min. Migrácie
- 30 min. Prejdenie si kódu a prípadná oprava chýb
- 30 min. Tvorba dokumentácie 