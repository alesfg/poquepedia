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

export const code = (lang) => {
  const code = {
    "7" : 'es-ES',
    "9" : 'en-GB',
    "5" : 'fr-FR',
    "6" : 'de-DE',
    "8" : 'it-IT',
    "1" : 'ja-JP',
    "12" : 'zh-CN',
    "4" : 'zh-TW',
    "3" : 'ko-KR'
  }
  return  code[lang];
}

export const voice = (lang) => {
  const voice = {
    "7" : "es-es-x-eed-network",
    "9" : 'en-gb-x-gba-local',
    "5" : "fr-fr-x-vlf-network",
    "6" : "de-de-x-deb-network",
    "8" : "it-it-x-itd-local",
    "1" : "ja-jp-x-jab-local",
    "12" : "cmn-cn-x-cce-local",
    "4" : "cmn-tw-x-cte-network",
    "3" : "ko-kr-x-ism-local"
  }
  return  voice[lang];
}
