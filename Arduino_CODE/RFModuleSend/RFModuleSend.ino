#include <SoftwareSerial.h> 
int M0 = 9;
int M1 = 8;
int Tx = 7;
int Rx = 6; 
SoftwareSerial mySerial(Tx, Rx); // RX, TX
void setup() {
   pinMode(M0,OUTPUT);
    pinMode(M1,OUTPUT);
    SleepMode();
   
}
void GeneralMode() {
  digitalWrite(M0, 0);
  digitalWrite(M1, 0);
}
void WeakupMode() {
  digitalWrite(M0, 1);
  digitalWrite(M1, 0);
}
void PowerSavingMode() {
  digitalWrite(M0, 1);
  digitalWrite(M1, 0);
}
void SleepMode() {
  digitalWrite(M0, 1);
  digitalWrite(M1, 1);
}
void loop() {
   Serial.begin(9600);
    mySerial.begin(9600);
  SleepMode();
  byte muteON[] = {0xC1,0xC1,0xC1};
  for(byte i =0;i<sizeof(muteON);i++)
  (mySerial.write(muteON[i])); 
 // mySerial.print("123");
   while (mySerial.available()) {   
    char inChar = (char)mySerial.read(); 
    Serial.print(inChar);
   }
   while (Serial.available()) {   
    char inChar = (char)Serial.read(); 
    Serial.print(inChar);
   }
  // put your main code here, to run repeatedly:

}
