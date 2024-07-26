{
  "Usuarios": {
    "id": {
      "type": "Int",
      "primary": true,
      "default": "autoincrement"
    },
    "name": {
      "type": "String"
    },
    "email": {
      "type": "String",
      "unique": true
    },
    "age": {
      "type": "Int"
    },
    "created": {
      "type": "DateTime",
      "default": "now"
    },
    "updated": {
      "type": "DateTime",
      "onUpdate": true
    }
  },
  "GPS": {
    "id": {
      "type": "Int",
      "primary": true,
      "default": "autoincrement"
    },
    "coordenada": {
      "type": "String"
    }
  }
}