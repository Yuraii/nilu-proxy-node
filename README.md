# nilu-proxy-node
Node proxy against NILU public datasets.
Will cache results in a mongodb instance and use that if requests against external API times out.

## Build

docker-compose build

## Run

docker-compose up

## API endpoints


| Endpoint               | Filters            |
| ---------------------- | ------------------ |
| /api/lookup/areas      | <none>             |
| /api/lookup/stations   | area, utd          |
| /api/lookup/components | <none>             |
| /api/lookup/aqis       | component, culture |
