
GET /_cat/indices?v=true&s=index


GET /_cluster/health
{
  
}

DELETE /task

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

POST /task/_doc
{
  "id": "123654"
}
DELETE /task/_doc/ciLsQn4BjShMp9fDJgXK

POST /task/_delete_by_query
{
  "query": {
    "match": {
      "public": "Karp"
    }
  }
}

GET /task/_search

GET /task/_search
{
  "query": {
    "match": {
      "ownerID":  
        "223184432280895490"
      
    }
  }
}


GET /task/_doc/9sHgLX4BeF8P419eTmz9

GET /task/_search
{
  "query": {
    "match": {
      "content.headline": "Karp"
    }
  }
}


GET /task/_mapping

POST /task/_doc/
    {
        "public": "public",
        "creationTimestamp": "2022-01-06T22:55:00.000Z",
        "content": {
            "headline": "Karp běžel doma",
            "content": "d13216516d1231d",
            "tags": []
        }
    }
    
    
PUT /task/_doc/test
    {
        "public": "public",
        "creationTimestamp": "2022-01-06T22:55:00.000Z",
        "content": {
            "headline": "Karp běžel doma",
            "content": "d13216516d1231d",
            "tags": []
        }
    }
    

GET /task/_search
POST /task/_update/gSo1Sn4BjShMp9fDHMOn
{
  "script": {
    "source": "if (ctx._source.ownerID == '223184432280895490') { ctx._source.status.completed = true; }",
    "lang": "painless"
  }
}

POST /task/_update/gSo1Sn4BjShMp9fDHMOn
{
  "script": {
    "lang": "painless",
    "source": "if (ctx._source.ownerID == '223184432280895490') {  ctx._source.status = params.commands; }",
    "params": {
      "commands": {
        "completed": false
      }
    }
  }
}
}

POST /task/_delete_by_query
{
  "query": {
    "bool": {
      "must": [
        { "match": { "_id": "XMMySn4BeF8P419etbhp" }},
        { "match": { "ownerID": "223184432280895490" }}
      ]
    }
  }
}

POST /task/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "_id": "XMMySn4BeF8P419etbhp" }},
        { "match": { "ownerID": "223184432280895490" }}
      ]
    }
  }
}

POST /task/_update_by_query
{
  "query": {
    "bool": {
      "must": [
        { "match": { "_id": "gSo1Sn4BjShMp9fDHMOn" }},
        { "match": { "ownerID": "223184432280895490" }}
      ]
    }
  },
  "script": {
    "source": "ctx._source.status.completed = true;",
    "lang": "painless"
  }
}
