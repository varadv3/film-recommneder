import psycopg2
# updated


# nobr
def get_database_connection():
    try:
        conn = psycopg2.connect(
            host='ep-calm-pond-a488jzqs-pooler.us-east-1.aws.neon.tech',
            dbname='verceldb',
            user="default",
            password="YylxnG5mU6SX",
            sslmode='require',
            options='endpoint=ep-calm-pond-a488jzqs-pooler'
        )
        print("Database Connected!")
        return conn
    except Exception as e:
        print("Database Connection Error:", e)
        return None
