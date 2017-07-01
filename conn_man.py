import psycopg2
import config
import urllib
import os


def connect_to_db():
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        conn = psycopg2.connect(database=url.path[1:], user=url.username, password=url.password, host=url.hostname, port=url.port)
        conn.autocommit = True
    except psycopg2.Error:
        print("""Connection with database failed. You made a typo in your database name, username or password.
            You should check your config.py""")

    return conn