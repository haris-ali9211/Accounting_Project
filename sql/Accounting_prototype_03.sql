create table Entry_Account (
Entry_id int Primary KEY IDENTITY (1, 1),
Date_Time DATETIME
)

select * from Entry_Account
select * from Debit_Info
select * from Credit_Info

create table Debit_Info(
Debit_id int Primary KEY IDENTITY (1, 1),
Debit_Data varchar(50) not null ,
Debit_Info_Amount int not null,
Debit_Info_Type_Entry int not null,
Debit_Info_Nature varchar(50),
Entry_id int,
foreign key (Entry_id) references Entry_Account(Entry_id)
)

INSERT INTO Debit_Info VALUES('cash',45000,201,'Debit',1)
INSERT INTO Debit_Info VALUES('land',140000,201,'Debit',2)
INSERT INTO Debit_Info VALUES('building',4000,201,'Debit',3)
INSERT INTO Debit_Info VALUES('office equipment',3000,201,'Debit',4)
INSERT INTO Debit_Info VALUES('account payable',2000,201,'Debit',5)


create table Credit_Info(
Credit_Data varchar(50) not null ,
Credit_Data_Amount int not null,
Credit_Data_Amount_Type_Entry int not null,
Credit_Data_Amount_Nature varchar(50),
Debit_id int,
foreign key (Debit_id) references Debit_Info(Debit_id)
)

INSERT INTO Credit_Info VALUES('capital',45000,401,'Credit',1)
INSERT INTO Credit_Info VALUES('unique',28000,401,'Credit',2)
INSERT INTO Credit_Info VALUES('unique1',112000,401,'Credit',2)
INSERT INTO Credit_Info VALUES('cash',4000,401,'Credit',3)
INSERT INTO Credit_Info VALUES('account payable',3000,401,'Credit',4)
INSERT INTO Credit_Info VALUES('cash',2000,401,'Credit',5)

delete from Credit_Info where Debit_id = 3

INSERT INTO Entry_Account VALUES(GETDATE())

DECLARE @Counter INT 
SET @Counter=1
WHILE ( @Counter <= 5)
BEGIN
    INSERT INTO Entry_Account VALUES(GETDATE())
    SET @Counter  = @Counter  + 1
END

delete from Entry_Account where Entry_id > 0

DROP TABLE Entry_Account;


select * from Debit_Info
outer join Credit_Info on Debit_id.Entry_id=Credit_Info.Debit_id 

SELECT *
FROM Entry_Account
inner JOIN Debit_Info
ON Entry_Account.Entry_id = Debit_Info.Entry_id
inner JOIN Credit_Info
ON Debit_Info.Entry_id = Credit_Info.Debit_id
where Entry_Account.Entry_id >=2 

SELECT * FROM Debit_Info
UNION
SELECT * FROM Credit_Info
