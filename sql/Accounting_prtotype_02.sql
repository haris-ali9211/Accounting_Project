create table Entry_Account (
Entry_id int Primary KEY IDENTITY (1, 1),
Date_Time DATETIME
)

create table Credit_Info(
Credit_Data varchar(50) not null ,
Credit_Data_Amount int not null,
Credit_Data_Amount_Type_Entry int not null,
Credit_Data_Amount_Nature varchar(50),
Entry_id int,
foreign key (Entry_id) references Entry_Account(Entry_id)
)

create table Debit_Info(
Debit_Data varchar(50) not null ,
Debit_Info_Amount int not null,
Debit_Info_Type_Entry int not null,
Debit_Info_Nature varchar(50),
Entry_id int,
foreign key (Entry_id) references Entry_Account(Entry_id)
)

INSERT INTO Credit_Info VALUES('cash',22,401,'debit',1)
INSERT INTO Debit_Info VALUES('equity',400,201,'credit',1)
INSERT INTO Entry_Account VALUES('2014-08-21')

select * from Entry_Account
select * from Credit_Info
select * from Debit_Info

select * from Entry_Account
inner join Credit_Info on Entry_Account.Entry_id=Credit_Info.Entry_id 
inner join Debit_Info on Credit_Info.Entry_id = Debit_Info.Entry_id

delete from Debit_Info where Entry_id = 2
delete from Credit_Info where Entry_id = 1
delete from Credit_Info where Credit_Data = 'account payable'
delete from Debit_Info where Debit_Data = 'office equipment'
delete from Entry_Account where Date_Time = '2014-08-21 1:1:1'

delete from Entry_Account where Entry_id > 6
delete from Credit_Info where Entry_id >6

INSERT INTO Entry_Account VALUES('2022-8-11 3:20:21')

INSERT INTO Debit_Info VALUES('account payable',2000,401,'Debit', 5)
INSERT INTO Credit_Info VALUES('cash',2000,401,'Credit',5)

assets 401, 
liability 402,
owner 403,
equity 404,
expense 405,
drawing 406,
revenue