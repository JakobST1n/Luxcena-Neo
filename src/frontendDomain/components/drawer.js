class Item {
    constructor(type, options=[]) {
        this.type = type;
        this.options = options;

        this.DOMElement = null;
        this.GenMarkup();
    }

    GenMarkup() {
        let tmpElem = null;
        switch (this.type) {

            case "divider":
                this.DOMElement = document.createElement("hr");
                this.DOMElement.className = "mdc-list-divider";
                break;

            case "subheader":
                this.DOMElement = document.createElement("h6");
                this.DOMElement.className = "mdc-list-group__subheader";
                this.DOMElement.innerHTML = this.options["label"];
                break;

            case "menu-item":
                this.DOMElement = document.createElement("a");
                this.DOMElement.className = "elevation-z2 drawer-item mdc-list-item mdc-list-item";
                this.DOMElement.href = this.options["href"];

                tmpElem = document.createElement("i");
                tmpElem.className = "material-icons mdc-list-item__graphic";
                tmpElem.innerHTML = this.options["icon"];
                this.DOMElement.appendChild(tmpElem);

                tmpElem = document.createElement("span");
                tmpElem.className = "mdc-list-item__text";
                tmpElem.title = this.options["name"];
                tmpElem.innerHTML = this.options["label"];
                this.DOMElement.appendChild(tmpElem);
                break;

            case "link":
                this.DOMElement = document.createElement("a");
                this.DOMElement.className = "elevation-z2 drawer-item mdc-list-item mdc-list-item";
                this.DOMElement.href = this.options["href"];
                this.DOMElement.target = "_blank";

                tmpElem = document.createElement("i");
                tmpElem.className = "material-icons mdc-list-item__graphic";
                tmpElem.innerHTML = this.options["icon"];
                this.DOMElement.appendChild(tmpElem);

                tmpElem = document.createElement("span");
                tmpElem.className = "mdc-list-item__text";
                tmpElem.title = this.options["name"];
                tmpElem.innerHTML = this.options["label"];
                this.DOMElement.appendChild(tmpElem);

                tmpElem = document.createElement("span");
                tmpElem.className = "mdc-list-item__meta material-icons";
                tmpElem.innerHTML = "open_in_new";
                this.DOMElement.appendChild(tmpElem);
                break;

        }
    }

    addClass(className) {
        let classList = this.DOMElement.classList;
        if (!(className in classList)) {
            classList.add(className);
        }
    }

    removeClass(className) {
        let classList = this.DOMElement.classList;
        classList.remove(className);
    }

}

export class MainDrawer {

    constructor(activeItemName = "dashboard") {
        this.items = [
            new Item("divider"),
            new Item("menu-item", {name:"dashboard", label:"Dashboard", href:"./", icon:"dashboard"}),
            new Item("menu-item", {name:"scripts", label:"Scripts", href:"./scripts", icon:"code"}),
            new Item("menu-item", {name:"logviewer", label:"LogViewer", href:"#", icon:"timeline"}),
            new Item("divider"),
            new Item("subheader", {label:"Settings"}),
            new Item("menu-item", {name:"strip_setup", label:"Strip setup", href:"./strip_setup", icon:"straighten"}),
            new Item("menu-item", {name:"settings", label:"Settings", href:"./settings", icon:"settings"}),
            new Item("divider"),
            new Item("link", {label:"Docs", href:"/docs/", icon:"book"})
        ]
        this.activeItemName = activeItemName;

        this.DOMElement = null;
        //this.setActive(activeItemName);
        this.genMarkupInDOM();
    }

    genMarkupInDOM() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "mdc-list";

        for (let i = 0; i < this.items.length; i++) {
            this.DOMElement.appendChild(this.items[i].DOMElement)
        }
    }

    setActive(itemName) {
        this.activeItemName = itemName;
        for (let i=0; i < this.items.length; i++) {
            let item = this.items[i];
            if ("name" in item.options) {
                if (item.options["name"] == itemName) {
                    item.addClass("mdc-list-item--activated");
                } else {
                    item.removeClass("mdc-list-item--activated");
                }
            }
        }
    }



}
