#define echoPin 6
#define trigPin 7
#define buzzerPin 8

int maximumRange = 50, minimumRange = 0;
//sayaç
int count = 0;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

//ardunio reset fonksiyonu
void(* resetFunc) (void) = 0;

void loop() {
  //başlangıç bekleyişi kısa için 2 uzun için 10 yazabilirsin
  delay(2000);
  
  int olcum = mesafe(maximumRange, minimumRange);
  
  if(olcum > 0){
     count++;
     //count 2 * 3 yani = 6 sn boyunca olcum 0 dan büyük önünde engel varsa melodiyi çaldır
     if(count >= 3)
     melodi(olcum*10); 
  } else {
    //olcum 0 sa ardunioyu resetle
    resetFunc();
  }
  
  Serial.print(count);
}



int mesafe(int maximumRange, int minimumRange) {
  long duration, distance;
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  
  duration = pulseIn(echoPin, HIGH);
  
  distance = duration / 58.2;
  
  delay(50);
  
   
  if(distance >= maximumRange || distance <= minimumRange) 
  return 0;
  return distance;
}

int melodi(int dly) {
  tone(buzzerPin, 440);
  delay(dly);
  noTone(buzzerPin);
  delay(dly);
}
