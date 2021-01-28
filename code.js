var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function generate_random_number() {
    let num_low = 1;
    let num_high = 9;
    return Math.floor(Math.random() * (num_high - num_low) + num_low);
}
function generateNumber() {
    return ("07" +
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
        generate_random_number());
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (figma.currentPage.selection.length === 1 &&
            figma.currentPage.selection[0].type === "TEXT") {
            const node = figma.currentPage.selection[0];
            yield figma.loadFontAsync(node.fontName);
            if (figma.currentPage.selection.length > 0) {
                figma.currentPage.selection[0].characters = "";
            }
            const text = figma.currentPage.selection[0];
            text.insertCharacters(0, generateNumber());
        }
        else {
            const nodes = [];
            yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
            const text = figma.createText();
            text.insertCharacters(0, generateNumber());
            nodes.push(text);
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
    });
}
main().then((message) => {
    figma.closePlugin(message);
});
