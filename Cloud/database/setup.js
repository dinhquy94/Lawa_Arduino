table systemstate
{
  timeupdate: timestamp, //
  firesensor: boolean,
  waterleackage: boolean, 
}
table Devices
{
  portId: //primary key,
  Name: String,
  Capacity: int default 0,
  state: boolean,
  FactoryId: String
}
table Factories
{
  FactoryId: String,
  FactoryName: String,
  Address: String,
  Phonenumber: String,
}
table sessions
{
  CreatedAt: TimeStamp
  ProductQuantity: Int
  UpdatedAt: TimeStamp//
  TimeEnd: TimeStamp
}
Table Employees
{
  Id: default,
  Name: String,
  DateOfBirth: TimeStamp,
  Sex: boolean,
  Phonenumber: String,
  Address: String
}
Table EmployeeLogs
{
  id,
  EmployeeID: String,
  CheckIn: TimeStamp,
  CheckOut: TimeStamp
}