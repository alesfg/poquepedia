export const translateType = (type) => {
    const tipos = {
      fire : "fuego",
      flying : "volador",
      grass : "planta",
      poison : "veneno",
      water : "agua",
      bug : "bicho",
      fighting : "luchador",
      rock : "roca",
      ground: "tierra",
      psychic : "psíquico",
      electric : "eléctrico",
      fairy : "hada",
      ice : "hielo",
      dragon : "dragón",
      dark : "oscuridad",
      ghost : "fantasma",
      steel : "acero",
      normal : "normal"
    }
    return  tipos[type];
}

export const translateHabitat = (habitat) => {
  const habitats = {
    mountain : "montañas  🗻",
    'waters-edge' : "agua  🚿",
    forest : "bosque   🌲",
    'rough-terrain' : "terreno accidentado  👺",
    grassland : "praderas  🌄",
    cave : "cuevas  🦇",
    rare : "lugares extraños  👽",
    sea : "mar  🌊",
    urban: "zonas urbanas  🌆"
  }
  return  habitats[habitat];
}

export const translateShape = (shape) => {
  const shapes = {
    armor : "armadura",
    arms : "brazos",
    ball : "bola",
    blob : "gota",
    'bug-wings' : "insecto alas",
    fish : "pez",
    heads : "cabezas",
    humanoid : "humanoide",
    legs: "piernas",
    quadruped : "cuadrúpedo",
    squiggle : "garabato",
    tentacles : "tentáculos",
    upright : "vertical",
    wings : "alas"
  }
  return  shapes[shape];
}

