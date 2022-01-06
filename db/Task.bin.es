// Task mappings

GET /_cluster/health
{}

GET /task/_search

PUT /task
{
    "mappings": {
        "properties": {
            "public": {
                "type": "keyword"
            }
        }
    }
}