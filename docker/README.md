# Installation

Creation et initialisation des bases de donnees.
Deploiement du programme dans le serveur Tomcat.

```
$ docker-compose build
```

# Lancement

```
$ docker-compose up -d
```

# Arret

```
$ docker-compose down
```

# Bases de données

Le fichier de création des tables SQL(*version mySql: 1.7*) sont dans [create.sql](/docker/mysql/create.sql), avec les tables suivantes :

- Utilisateurs(**username**, password, nom, prenom, dateN)
- Friends(**id1***, **id2***, anniv)
- estConnecte(**id***,**cle**, lim)

*MongoDb*:
- Message(ObjectID, id_author, name, text, date, like, comment)