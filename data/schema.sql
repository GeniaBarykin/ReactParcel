create table if not exists users(
  name text primary key,
  bcryptPassword text not null,
  level int not null default 1 /* 1=user 5=maintainer 9=owner */
);

insert or replace into users(name,bcryptPassword,level) values(
    "user",
    "$2b$12$aSC4i0puHmBhEOPdm/ocKOJD4Se3KiajWMznvdx4vN.p./yEWfuee",
    1
);

insert or replace into users(name,bcryptPassword,level) values(
  "admin",
  "$2b$12$9BwyzrkCBioedc6.YLh6xO8jWpHfMeN6hrguMR7qAY7m8CSGrt8Si",
  9
);


create table if not exists highScores(
    userName text not null,
    highscore int not null,
    primary key (userName, highscore)
);

insert or replace into highScores(userName,highscore) values("user", 210);