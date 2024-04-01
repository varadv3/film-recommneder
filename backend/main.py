from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_database_connection

app = FastAPI()
conn = get_database_connection()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin, you may want to restrict this in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/films/{category}")
async def get_all_films_by_category(category: str):
    category = category.capitalize()
    cur = conn.cursor()
    category_query = f"""
        SELECT category_id from category
        WHERE name='{category}';
    """
    cur.execute(query=category_query)
    category_id = cur.fetchone()
    if category_id is None:
        raise HTTPException(
            status_code=404,
            detail="Category Not Found"
        )
    category_id = category_id[0]
    film_query = f"""
        SELECT title, description 
        from film INNER JOIN film_category
        ON film.film_id = film_category.film_id
        WHERE film_category.category_id = {category_id};
    """
    cur.execute(query=film_query)
    films = []
    for title, description in cur.fetchall():
        films.append({"title": title, "description": description})
    return films
