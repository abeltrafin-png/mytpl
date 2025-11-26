#!/bin/bash

# Test /api/alumni endpoint for successful data retrieval
echo "Testing GET /api/alumni endpoint..."

response=$(curl -s -w "%{http_code}" http://localhost:3000/api/alumni)
http_code=${response: -3}
body=${response:0:-3}

echo "HTTP Status: $http_code"

if [ "$http_code" == "200" ]; then
  echo "Response Body:"
  echo "$body" | jq '.' || echo "$body"
else
  echo "Failed to fetch /api/alumni endpoint: HTTP $http_code"
  echo "Response Body:"
  echo "$body"
fi
