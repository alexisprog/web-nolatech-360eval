type Json = string | number | boolean | JsonObject | JsonArray | null
interface JsonObject {
  [key: string]: Json
}
type JsonArray = Json[]

function isNumString(value: string): boolean {
  return !isNaN(Number(value))
}
function deepParseJson<T = Json>(jsonString: Json): T {
  if (typeof jsonString === 'string') {
    if (isNumString(jsonString)) {
      return jsonString as unknown as T
    }
    try {
      return deepParseJson<T>(JSON.parse(jsonString))
    } catch (err) {
      return jsonString as unknown as T
    }
  } else if (Array.isArray(jsonString)) {
    return jsonString.map((val) => deepParseJson(val as Json)) as unknown as T
  } else if (typeof jsonString === 'object' && jsonString !== null) {
    return Object.keys(jsonString).reduce<JsonObject>((obj, key) => {
      const val = jsonString[key]
      obj[key] = isNumString(val as string) ? val : deepParseJson(val as Json)
      return obj
    }, {}) as unknown as T
  } else {
    return jsonString as T
  }
}

export default deepParseJson
