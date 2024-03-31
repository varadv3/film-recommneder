import psycopg2

try:
    conn = psycopg2.connect(
        host='localhost',
        dbname='dvdrental',
        user="postgres",
        password="888277723",
        port=5432
    )
    print("Database Connected!")
except:
    print("Database not Connected!")

def get_database_connection():
    return conn