/**
 * Page-spesific javascript for the "strip-setup"-page of luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */
import {MDCSwitch} from "@material/switch";
import {MDCSelect} from "@material/select";
import {addEventListenerToClassName} from "../../../frontendJsModules/dom";

/** Generate a list of segments from elements in the DOM
 *
 * @return {list} A list containing all the segments
 */
function generateSegmentList() {
    let segmentCount = document.getElementsByClassName("segment-card__list__segments")[0].childElementCount;
    let segmentList = [];

    for (let i = 0; i < segmentCount; i++) {
        segmentList.push(Number(document.getElementById("segment_" + String(i)).value));
    }

    return segmentList;
}

/** Function that generates a matrix configuration from the elements in the DOM.
 *
 * @return {object} A two dimentional array conatining (jsMatrixConfig and pyMatrixConfig).
 */
function generateMatrixConfig() {
    let usedSegments = [];
    let validationError = false;
    let matrixYElementList = document.querySelector(".matrix-card__list");
    let yElements = matrixYElementList.childElementCount;
    let pythonicArray = "[";
    let jsArray = [];

    for (let i = 0; i < yElements; i++) {
        let matrixXNodes = matrixYElementList.children[i].querySelector(".matrix-card__list__x__items");
        let matrixXInputNodes = matrixXNodes.getElementsByTagName("input");
        //let matrixXButtonNodes = matrixXNodes.getElementsByTagName("button");
        let xElements = matrixXInputNodes.length;

        let pythonicArrayElement = "[";
        let jsArrayElement = [];

        for (let o = 0; o < xElements; o++) {
            let xElementInput = matrixXInputNodes[o];
            let cSegmentNumber = Number(xElementInput.value);

            if ( (usedSegments.indexOf(cSegmentNumber) != -1) || (xElementInput.value == "") ) {
                validationError = true;

                /* code to change the classes keeping current invert state */
                let cInverted = false;
                if (xElementInput.className.indexOf("inverted") != -1) {
                    cInverted = true;
                }

                xElementInput.className =
                        "matrix-card__list__x__items__item validationError"
                        + (cInverted ? " inverted" : "");
            } else {
                usedSegments.push(cSegmentNumber);

                /* code to change the classes keeping current invert state */
                let cInverted = false;
                if (xElementInput.className.indexOf("inverted") != -1) {
                    cInverted = true;
                }

                xElementInput.className =
                        "matrix-card__list__x__items__item"
                        + (cInverted ? " inverted" : "");
            }

            let inverted = (xElementInput.className.indexOf("inverted") == -1) ? false : true;

            pythonicArrayElement += "["
                                + String(cSegmentNumber)
                                + ","
                                + (inverted ? "true" : "false")
                                +"],";

            jsArrayElement.push([cSegmentNumber, inverted]);

        }

        pythonicArrayElement = pythonicArrayElement.slice(0, -1); // Remove last comma
        pythonicArrayElement += "],";
        pythonicArray += pythonicArrayElement;
        jsArray.push(jsArrayElement);
    }

    pythonicArray = pythonicArray.substring(0, pythonicArray.length - 1); // Remove last comma
    pythonicArray += "]";

    if (validationError) {return -1;}
    return { jsMatrixConfig : jsArray, pyMatrixConfig : pythonicArray };
}

/** Generate a matrix from a config and a list of segments, then display it in the DOM as ascii.
 *
 * @param {array} config A javascript-like array of an matrix (output from generateMatrixConfig()).
 */
function generateMatrixDump(config) {
    let segmentList = generateSegmentList();
    let htmlOut = "";
    let elementWidth = String(segmentList.reduce(function(a,b){return a+b;},0)).length + 2;

    for (let y = 0; y < config.length; y++) {
        let yElement = config[y];


        for (let x = 0; x < yElement.length; x++) {
            let segmentN = yElement[x][0];
            let inverted = yElement[x][1];

            let startLED = 0;
            for (let i = 0; i < segmentN; i++) { startLED += segmentList[i]; }

            if (!inverted) {
                for (let i = startLED; i < startLED + segmentList[segmentN]; i++) {
                    htmlOut += String(i).padStart(elementWidth, " ");
                }
            } else {
                for (let i = startLED + segmentList[segmentN]; i > startLED; i--) {
                    htmlOut += String(i).padStart(elementWidth, " ");
                }
            }

        }
        htmlOut += "\n";
    }

    let html = "<span class=\"function\">Generated matrix:</span>\n";
    html += htmlOut;
    document.getElementById("generated-matrix-dump").innerHTML = html;

}

/** Function for generating a matrix config.
 *  If the config is valid,
 *  it will dump it to the DOM, based on values from generateSegmentList().
 */
function generateMatrix() {
    let matrixConfig = generateMatrixConfig();
    if (matrixConfig == -1) { return; }

    generateMatrixDump(matrixConfig.jsMatrixConfig);

}

/** Function for generating segment list, and dumping it do DOM
 */
function generateSegmentListAndDump() {
    // Generate a new list of segments, and display in DOM
    let segListHTML = generateSegmentList().map(x => "<span class=\"number\">" + String(x) + "</span>").join(", ");
    document.getElementById("generated-segment-list").innerHTML = "[" + segListHTML + "]";
}

/** This function simply handles changed input in segment-inputs, transforms it,
 *  and displays a the new list of segments in DOM.
 */
function segmentInputChange() {
    // Cut characters, not allowed to input more than 3 characters
    if (this.value.length > 3) {
        this.value = this.value.slice(0,3);
    }
    // Absolute, it's actually impossible to have a negative amount of leds.
    if (this.value < 0) {
        this.value = this.value * -1;
    }

    generateSegmentListAndDump();
    // This probably changes something with the matrix as well, so lets dump that to the DOM.
    generateMatrix();
}

/** Function for adding a new segment input box to the DOM
 */
function addSegment() {
    let segmentCount = document.getElementsByClassName("segment-card__list__segments")[0].childElementCount;
    let segment_list = document.querySelector(".segment-card__list__segments");

    let newSegmentWrapper = document.createElement("div");
    newSegmentWrapper.className = "segment-wrapper";
    newSegmentWrapper.id = "segment_" + String(segmentCount) + "_wrapper";

    let newIdentificator = document.createElement("span");
    newIdentificator.className = "identificator";
    newIdentificator.id = "segment_" + String(segmentCount) + "_identificator";
    newIdentificator.innerHTML = String(segmentCount);

    let newSegment = document.createElement("input");
    newSegment.type = "number";
    newSegment.title = "Segment " + String(segmentCount);  // segmentCount + 1, but we want the 0-based number
    newSegment.id = "segment_" + String(segmentCount);
    newSegment.dataset.number = String(segmentCount);

    newSegmentWrapper.appendChild(newIdentificator);
    newSegmentWrapper.appendChild(newSegment);
    segment_list.appendChild(newSegmentWrapper);

    document.getElementById("segment_" + String(segmentCount)).addEventListener("input", segmentInputChange);
}

/** Simply remove the last segment input element from the DOM
 */
function removeSegment() {
    let segmentCount = document.getElementsByClassName("segment-card__list__segments")[0].childElementCount;
    if (segmentCount < 2) {
        return;// We dont want to have fewer segments than one, so if less than 2
    }
    let segment_list = document.querySelector(".segment-card__list__segments");

    segment_list.removeChild(document.getElementById("segment_" + String(segmentCount - 1) + "_wrapper"));

}

/* Function for invert-buttons on matrix-elements.
 * It toggles an inverted class to the element.
 */
function invertMatrixElement() {
    let inputElement = document.getElementById(this.dataset.target);

    let cInverted = false;
    if (inputElement.className.indexOf("inverted") != -1) { cInverted = true; }

    let validationError = false;
    if (inputElement.className.indexOf("validationError") != -1) { validationError = true; }

    inputElement.className = "matrix-card__list__x__items__item"
                            + (validationError ? " validationError" : "")
                            + (!cInverted ? " inverted" : "");

    // generate the new matrix to show it in the DOM.
    generateMatrix();
}

/** Add a matrix element i X-direction to DOM.
 */
function addMatrixXElement() {
    let xLen = this.parentNode.dataset.len;
    let yPos = this.parentNode.dataset.ypos;

    let newSeperator = document.createElement("span");
    newSeperator.className = "seperator";
    newSeperator.id = "matrix_" + String(xLen - 1) + "_" + String(yPos) + "_seperator";
    newSeperator.innerHTML = "-";

    let newMatrixElement = document.createElement("input");
    newMatrixElement.type = "number";
    newMatrixElement.className = "matrix-card__list__x__items__item";
    newMatrixElement.name = "Matrix x: " + String(xLen) + " y: " + String(yPos);
    newMatrixElement.id = "matrix_" + String(xLen) + "_" + String(yPos);

    let newInvertButton = document.createElement("button");
    newInvertButton.className = "matrix_element_invert_button mdc-icon-button material-icons";
    newInvertButton.dataset.target = "matrix_" + String(xLen) + "_" + String(yPos);
    newInvertButton.innerHTML = "compare_arrows";

    let nodeToAppendTo = this.parentNode.querySelector(".matrix-card__list__x__items");
    nodeToAppendTo.appendChild(newSeperator);
    nodeToAppendTo.appendChild(newMatrixElement);
    nodeToAppendTo.appendChild(newInvertButton);

    this.parentNode.dataset.len = String(Number(this.parentNode.dataset.len) + 1);
    addEventListenerToClassName(".matrix-card__list__x__items__item", "input", generateMatrix);
    addEventListenerToClassName(".matrix_element_invert_button", "click", invertMatrixElement);
}

/** Remove a matrix element in X-direction from DOM.
 */
function removeMatrixXElement() {
    let nodesToRemove = 3;
    let xLen = this.parentNode.dataset.len;
    //let yPos = this.parentNode.dataset.ypos;

    if (xLen <= 1) { return; }

    let listNode = this.parentNode.querySelector(".matrix-card__list__x__items");
    for (let i = 0; i < nodesToRemove; i++) {
        listNode.removeChild(listNode.lastChild);
    }

    this.parentNode.dataset.len = String(Number(this.parentNode.dataset.len) - 1);
}

/** Adds a matrix element in the Y-direction to DOM.
 */
function addMatrixYElement() {
    let yPos = Number(this.parentNode.querySelector(".matrix-card__list").childElementCount);

    let newListItem = document.createElement("li");
    newListItem.className = "matrix-card__list__y__item";
    newListItem.dataset.ypos = yPos;
    newListItem.dataset.len = "1";

    let newMatrixXElementsList = document.createElement("div");
    newMatrixXElementsList.className = "matrix-card__list__x__items";

    let newMatrixElement = document.createElement("input");
    newMatrixElement.className = "matrix-card__list__x__items__item";
    newMatrixElement.type = "number";
    newMatrixElement.name = "Matrix x: 0 y: " + yPos;
    newMatrixElement.id = "matrix_0_" + yPos;

    let newButtonInvertItem = document.createElement("button");
    newButtonInvertItem.className = "matrix_element_invert_button mdc-icon-button material-icons";
    newButtonInvertItem.dataset.target = "matrix_0_" + yPos;
    newButtonInvertItem.innerHTML = "compare_arrows";

    let newButtonAddXItem = document.createElement("button");
    newButtonAddXItem.className = "matrix_add_x_item mdc-icon-button material-icons";
    newButtonAddXItem.innerHTML = "add_circle_outline";

    let newButtonRemoveXItem = document.createElement("button");
    newButtonRemoveXItem.className = "matrix_remove_x_item mdc-icon-button material-icons";
    newButtonRemoveXItem.innerHTML = "remove_circle_outline";

    newMatrixXElementsList.appendChild(newMatrixElement);
    newMatrixXElementsList.appendChild(newButtonInvertItem);

    newListItem.appendChild(newMatrixXElementsList);
    newListItem.appendChild(newButtonAddXItem);
    newListItem.appendChild(newButtonRemoveXItem);

    this.parentNode.querySelector(".matrix-card__list").appendChild(newListItem);

    addEventListenerToClassName(".matrix_add_x_item", "click", addMatrixXElement);
    addEventListenerToClassName(".matrix_remove_x_item", "click", removeMatrixXElement);
    addEventListenerToClassName(".matrix-card__list__x__items__item", "input", generateMatrix);
}

/** Remove the last matrix element in the Y-direction from the DOM.
 */
function removeMatrixYElement() {
    let matrixCardList = this.parentNode.querySelector(".matrix-card__list");

    let yElementsCount = matrixCardList.childElementCount;
    if (yElementsCount <= 1) { return; }

    matrixCardList.removeChild(matrixCardList.lastChild);
}


export default function() {
    document.getElementById("add_segment").addEventListener("click", addSegment);
    document.getElementById("remove_segment").addEventListener("click", removeSegment);

    addEventListenerToClassName(".matrix_element_invert_button", "click", invertMatrixElement);

    addEventListenerToClassName(".matrix_add_x_item", "click", addMatrixXElement);
    addEventListenerToClassName(".matrix_remove_x_item", "click", removeMatrixXElement);
    addEventListenerToClassName(".matrix_add_y_item", "click", addMatrixYElement);
    addEventListenerToClassName(".matrix_remove_y_item", "click", removeMatrixYElement);
    addEventListenerToClassName(".matrix-card__list__x__items__item", "input", generateMatrix);

    const invertSignal = new MDCSwitch(document.querySelector('.mdc-switch'));
    const gpioSelect = new MDCSelect(document.querySelector('.advanced-card__list__GPIO'));
    const dmaSelect = new MDCSelect(document.querySelector('.advanced-card__list__DMA'));
    const ledChannelSelect = new MDCSelect(document.querySelector('.advanced-card__list__led-channel'));
    const frequencySelect = new MDCSelect(document.querySelector('.advanced-card__list__freq'));
}
