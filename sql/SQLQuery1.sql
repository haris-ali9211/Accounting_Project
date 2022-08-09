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

select * from Entry_Account
select * from Credit_Info
select * from Debit_Info
 
select Entry_Account.Entry_id,Entry_Account.Date_Time from Entry_Account full outer join Credit_Info on Entry_Account.Entry_id = Credit_Info.Entry_id

select Debit_Data, Amount, Type_Entry, Nature from Debit_Info  
inner join Entry_Account on Debit_Info.Entry_id = Entry_Account.Entry_id
inner join Credit_Info on Credit_Info.Entry_id = Entry_Account.Entry_id

select Credit_Data, Amount, Type_Entry, Nature from Credit_Info full outer join Entry_Account on Credit_Info.Entry_id = Entry_Account.Entry_id

select * from Entry_Account
 inner join Credit_Info on Entry_Account.Entry_id=Credit_Info.Entry_id 
 inner join Debit_Info on Credit_Info.Entry_id = Debit_Info.Entry_id

 delete from Debit_Info where Entry_id = 1