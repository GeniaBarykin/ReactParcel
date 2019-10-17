create table if not exists accounts(
  name text primary key,
  bcryptPassword text not null,
  level int not null default 1 /* 1=user 5=maintainer 9=owner */
);

insert or replace into accounts(name,bcryptPassword,level) values(
  "user",
  "$2b$12$aSC4i0puHmBhEOPdm/ocKOJD4Se3KiajWMznvdx4vN.p./yEWfuee",
  1
);

create table if not exists highScores(
    userName text not null,
    highscore int not null,
    primary key (userName, highscore)
);

insert or replace into highScores(userName,highscore) values("user", 210);
insert or replace into highScores(userName,highscore) values("user", 65);
