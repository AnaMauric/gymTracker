# gymTracker
Gym Tracker je spletna aplikacija, zgrajena s FastAPI in SQLAlchemy, ki uporabnikom omogoča beleženje, spremljanje in brisanje vadb. 

Predpogoji:
Python 3.x
pip 
Docker

Namestitev Odvisnosti: pip install -r requirements.txt

Zagon brez Dockerja: 
uvicorn main:app --reload --host <IP>

Zagon z Dockerjem: 
sudo docker-compose build
sudo docker-compose up
