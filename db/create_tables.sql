CREATE TABLE IF NOT EXISTS lot (
  spotId INT NOT NULL,
  car varchar(250) NOT NULL,
  UNIQUE(spotId),
  size varchar(250) NOT NULL,
  checkin timestamp NOT NULL,
  checkout timestamp
);