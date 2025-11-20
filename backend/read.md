docker run --name postgres_cms   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=postgres   -e POSTGRES_DB=cms_app   -p 5432:5432   -d postgres:latest

