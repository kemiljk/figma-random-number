function generate_random_number() {
  let num_low = 1;
  let num_high = 9;
  return Math.floor(Math.random() * (num_high - num_low) + num_low);
}

function generateNumber() {
  return (
    "07" +
    generate_random_number() +
    generate_random_number() +
    generate_random_number() +
    " " +
    generate_random_number() +
    generate_random_number() +
    generate_random_number() +
    " " +
    generate_random_number() +
    generate_random_number() +
    generate_random_number()
  );
}

async function main(): Promise<string | undefined> {
  if (
    figma.currentPage.selection.length === 1 &&
    figma.currentPage.selection[0].type === "TEXT"
  ) {
    const node = figma.currentPage.selection[0];
    await figma.loadFontAsync(node.fontName as FontName);
    if (figma.currentPage.selection.length > 0) {
      figma.currentPage.selection[0].characters = "";
    }
    const text = figma.currentPage.selection[0];
    text.insertCharacters(0, generateNumber());
  } else {
    const nodes = [];
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    const text = figma.createText();
    text.insertCharacters(0, generateNumber());
    nodes.push(text);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
}

main().then((message: string | undefined) => {
  figma.closePlugin(message);
});
