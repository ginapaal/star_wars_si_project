import psycopg2
import config
import urllib


def connect_to_db():
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        conn = psycopg2.connect("dbname='{}' user='{}' host='localhost' password='{}'".format(
            config.db_name, config.user, config.password))
        conn.autocommit = True
    except psycopg2.Error:
        print("""Connection with database failed. You made a typo in your database name, username or password.
            You should check your config.py""")

    return conn