create table Entry_Account (
Entry_id int Primary KEY IDENTITY (1, 1),
Date_Time DATETIME
)

create table Credit_Info(
Credit_Data varchar(50) not null ,
Amount int not null,
Type_Entry int not null,
Nature varchar(50),
Entry_id int,
foreign key (Entry_id) references Entry_Account(Entry_id)
)

create table Debit_Info(
Debit_Data varchar(50) not null ,
Amount int not null,
Type_Entry int not null,
Nature varchar(50),
Entry_id int,
foreign key (Entry_id) references Entry_Account(Entry_id)
)

INSERT INTO Entry_Account VALUES('2014-08-21')
INSERT INTO Credit_Info VALUES('cash',22,401,'debit',1)
INSERT INTO Debit_Info VALUES('equity',400,201,'credit',1)

 