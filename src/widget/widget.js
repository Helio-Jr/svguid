import { getColorIterator } from "./utils/colors/color.js"

function widget(key, draw) {
  const nextColor = getColorIterator(key)

  // ======================
  // CONFIGURAÇÕES GERAIS
  // ======================
  const cx = 500 // centro do avatar
  const cy = 500
  const baseSize = 400

  // Fundo (círculo principal)
  const bgColor = nextColor()
  draw.circle(900).center(cx, cy).fill(bgColor)

  // ======================
  // PELE / ROSTO
  // ======================
  const skinTones = ["#FBD3B0", "#E0A899", "#C68642", "#8D5524"]
  const skinColor = skinTones[key.next16() % skinTones.length]
  draw.circle(baseSize).center(cx, cy-80).fill(skinColor)

  // ======================
  // CABELO
  // ======================
  const hairColors = ["#2C1B18", "#4A312C", "#A55728", "#D6A57C", "#000"]
  const hairColor = hairColors[key.next16() % hairColors.length]

  const hairStyle = key.next16() % 4
  if (hairStyle === 0) {
    // Curto masculino
    draw.path(`M${cx - 200},${cy - 180} 
               Q${cx},${cy - 300} ${cx + 200},${cy - 180} 
               L${cx + 200},${cy - 100} 
               Q${cx},${cy - 250} ${cx - 200},${cy - 100} Z`)
      .fill(hairColor)
  } else if (hairStyle === 1) {
    // Cabelo longo
    draw.ellipse(450, 500).center(cx, cy - 100).fill(hairColor)
  } else if (hairStyle === 2) {
    // Topete
    draw.path(`M${cx - 180},${cy - 140} 
               Q${cx},${cy - 260} ${cx + 180},${cy - 140} 
               Z`).fill(hairColor)
  } else {
    let headSize = baseSize
        if (hairStyle === 3) { // careca
            headSize = baseSize * 0.9 // diminui 10%
        }
    
        draw.circle(headSize).center(cx, cy - 80).fill(skinColor)

    // Careca
    // nada é desenhado
  }

  // ======================
  // OLHOS
  // ======================
  const eyeY = cy - 60
  const eyeSpacing = 100
  const eyeWhite = "white"
  const eyeColor = "#333"

  draw.circle(50).center(cx - eyeSpacing, eyeY).fill(eyeWhite)
  draw.circle(20).center(cx - eyeSpacing, eyeY).fill(eyeColor)
  draw.circle(50).center(cx + eyeSpacing, eyeY).fill(eyeWhite)
  draw.circle(20).center(cx + eyeSpacing, eyeY).fill(eyeColor)

  // ======================
  // SOBRANCELHAS
  // ======================
  const browY = eyeY - 40  // posição vertical (acima dos olhos)
  const browWidth = 80     // distância horizontal total
  const browHeight = 30    // altura da curva
  const browColor = hairColor // mesma cor do cabelo
  
  // Sobrancelha esquerda
  draw.path(`
    M${cx - eyeSpacing - browWidth / 2},${browY}
    Q${cx - eyeSpacing},${browY - browHeight}
    ${cx - eyeSpacing + browWidth / 2},${browY}
  `).stroke({ color: browColor, width: 8, linecap: "round" }).fill("none")

  // Sobrancelha direita
  draw.path(`
    M${cx + eyeSpacing - browWidth / 2},${browY}
    Q${cx + eyeSpacing},${browY - browHeight}
    ${cx + eyeSpacing + browWidth / 2},${browY}
  `).stroke({ color: browColor, width: 8, linecap: "round" }).fill("none")

  // ======================
  // BOCA
  // ======================
  const mouthType = key.next16() % 3
  if (mouthType === 0) {
    // sorriso
    draw.path(`M${cx - 80},${cy + 40} Q${cx},${cy + 90} ${cx + 80},${cy + 40}`)
      .stroke({ color: "#B33", width: 6, linecap: "round" })
      .fill("none")
  } else if (mouthType === 1) {
    // neutra
    draw.line(cx - 60, cy + 50, cx + 60, cy + 50)
      .stroke({ color: "#B33", width: 6, linecap: "round" })
  } else {
    // triste
    draw.path(`M${cx - 80},${cy + 70} Q${cx},${cy + 40} ${cx + 80},${cy + 70}`)
      .stroke({ color: "#B33", width: 6, linecap: "round" })
      .fill("none")
  }

  // ======================
  // ROUPA
  // ======================
  const shirtColors = ["#4682B4", "#9370DB", "#2E8B57", "#FF6347", "#FFD700"]
  const shirtColor = shirtColors[key.next16() % shirtColors.length]

  const shirtOffsetY = -120

  draw.path(`M${cx - 120},${cy + 200 + shirtOffsetY} 
  Q${cx},${cy + 280 + shirtOffsetY} ${cx + 120},${cy + 200 + shirtOffsetY} 
  L${cx + 250},${cy + 450 + shirtOffsetY} 
  L${cx - 250},${cy + 450 + shirtOffsetY} Z`)
  .fill(shirtColor)



  // ======================
  // ACESSÓRIO (opcional)
  // ======================
  const accessoryChance = key.next() % 4
  if (accessoryChance === 0) {
    // Óculos
    const frameColor = "#222"
    const eyeglassY = eyeY
    const size = 60
    draw.rect(size, 40)
      .center(cx - eyeSpacing, eyeglassY)
      .stroke({ color: frameColor, width: 5 })
      .fill("none")
    draw.rect(size, 40)
      .center(cx + eyeSpacing, eyeglassY)
      .stroke({ color: frameColor, width: 5 })
      .fill("none")
    draw.line(cx - eyeSpacing + size / 2, eyeglassY, cx + eyeSpacing - size / 2, eyeglassY)
      .stroke({ color: frameColor, width: 5 })
  } else if (accessoryChance === 1) {
    // Chapéu
    draw.rect(260, 40).center(cx, cy - 230).fill(hairColor)
    draw.rect(160, 60).center(cx, cy - 270).fill(hairColor)
  }
}

export default widget
