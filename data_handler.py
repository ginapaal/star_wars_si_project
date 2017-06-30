from conn_man import connect_to_db
from flask import request


def sign_up(username, password, conn):
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO users (username, password) VALUES (%s,%s);""", (username, password))
    cursor.close()
