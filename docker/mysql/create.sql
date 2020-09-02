CREATE DATABASE test;

USE test;

CREATE TABLE utilisateurs(
       username VARCHAR(15),
       password BLOB NOT NULL,
	nom VARCHAR(32) NOT NULL,
	prenom VARCHAR(32) NOT NULL,
	email VARCHAR(32) NOT NULL,
	dateN DATE,
       PRIMARY KEY(username),
	constraint emailUnique unique(email)
       );

CREATE TABLE friends(
       id1 VARCHAR (15) NOT NULL,
       id2 VARCHAR (15) NOT NULL,
       anniv TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key (id1,id2),
       FOREIGN KEY(id1) REFERENCES utilisateurs(username) on delete cascade,
       FOREIGN KEY(id2) REFERENCES utilisateurs(username) on delete cascade,
       CONSTRAINT id_diff CHECK(id1<>id2)
       );

create table estconnecte ( 
	id varchar(15) NOT NULL, 
	cle varchar(32) NOT NULL, 
	lim TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	foreign key(id) references utilisateurs(username) on delete cascade, 
	primary key(id, cle)
);

insert into utilisateurs (username, password, nom, prenom, email, dateN) values ('otojya', AES_ENCRYPT('hizachiryou', 'naisho'), 'Shimura', 'Umajirou', 'otojya@2bro.jpx', '1998/04/10');
insert into utilisateurs (username, password, nom, prenom, email, dateN) values ('anijya', AES_ENCRYPT('anikofu', 'naisho'), 'Shimura', 'Pokotarou', 'anijya@2bro.jp', '1998/04/13');
insert into utilisateurs (username, password, nom, prenom, email, dateN) values ('otsuichi', AES_ENCRYPT('fenminchan', 'naisho'), 'Otsuichi', 'Koutarou', 'otsuichi@2bro.jp', '1998/04/12');
insert into utilisateurs (username, password, nom, prenom, email, dateN) values ('mukuchichan', AES_ENCRYPT('nagato', 'naisho'), 'Watanabe', 'Rio', 'nagato.yuki@jmail.com', '1998/04/10');
insert into utilisateurs (username, password, nom, prenom, email, dateN) values ('mochio', AES_ENCRYPT('wakannai', 'naisho'), 'Takeda', 'Moria', 'mamimumemochio@yooha.co.jp', '1973/02/29');
insert into utilisateurs (username, password, nom, prenom, email, dateN) values ('chiipan', AES_ENCRYPT('basssaikou', 'naisho'), 'Tanaka', 'Chitose', 'chiipan@softbass.jp', '1990/12/20');

insert into friends (id1, id2) values ('otojya', 'otsuichi');
insert into friends (id1, id2) values ('otsuichi', 'anijya');
insert into friends (id1, id2) values ('anijya', 'otojya');
insert into friends (id1, id2) values ('chiipan', 'mukuchichan');

insert into estconnecte (id, cle) values ('mukuchichan', 'asdasda');
