// Gera index.html embutindo o three.js (assim o arquivo funciona offline).
// Uso: node build.js
const fs = require("fs");
const path = require("path");
const ler = f => fs.readFileSync(path.join(__dirname, f), "utf8");
let html = ler("src/oficina.html");
const blocos = {
  "/*@@THREE@@*/": ler("vendor/three.min.js"),
  "/*@@ORBIT@@*/": ler("vendor/OrbitControls.js"),
};
for (const [marca, js] of Object.entries(blocos)) {
  if (!html.includes(marca)) throw new Error("marcador não encontrado: " + marca);
  if (/<\/script/i.test(js)) throw new Error("script contém </script>: " + marca);
  html = html.split(marca).join(js);
}
fs.writeFileSync(path.join(__dirname, "index.html"), html);
console.log("index.html gerado:", (html.length / 1024).toFixed(0), "KB");
