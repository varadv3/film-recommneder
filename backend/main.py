from fastapi import FastAPI, HTTPException
from database import get_database_connection

app = FastAPI()
conn = get_database_connection()

@app.get("/films/{category}")
def get_all_films_by_category(category: str):
    category.capitalize()
    # print(category)
    cur = conn.cursor()
    category_query = f"""
        SELECT category_id from category
        WHERE name='{category}';
    """
    cur.execute(query=category_query)
    id = cur.fetchall()
    if len(id) == 0:
        return HTTPException(
            status_code=404,
            detail="Category Not Found"
        )
    id = id[0][0]
    film_query = f"""
        SELECT title, description 
        from film INNER JOIN film_category
        ON film.film_id = film_category.film_id
        WHERE film_category.category_id = {id};
    """
    cur.execute(query=film_query)
    films = list()
    for film, description in cur.fetchall():
        films.append(
            {
                "title":film,
                "description":description
            }
        )
    # print(films)
    return films