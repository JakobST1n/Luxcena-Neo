
let diagrams = document.querySelector("#diagram");
for (let i=0; i < diagrams.length; i++) {
    let diagram = diagrams[i];
    let svg = Diagram.parse(diagram.innerHTML);
    diagram.drawSVG("diagram", {theme: "simple"})
}
