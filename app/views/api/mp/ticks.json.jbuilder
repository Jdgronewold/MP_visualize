json.array! @ticks['ticks'].each_with_index.to_a do |(tick, idx)|
  json.extract! tick, "routeId", "date", "pitches", "notes"
  json.name @routes['routes'][idx]['name']
  json.type @routes['routes'][idx]['type']
  json.rating @routes['routes'][idx]['rating']
end
