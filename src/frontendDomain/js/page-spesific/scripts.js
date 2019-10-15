/**
 * Page-spesific javascript for the "scripts"-page of luxcena-neo.
 *
 * @author jakobst1n.
 * @since  04.06.2019
 */
import {MDCMenu} from "@material/menu/index";

export default function() {

    const menu = new MDCMenu(document.querySelector(".mdc-menu"));
    //menu.open = true;
    menu.setAbsolutePosition(180, -10);
    document.querySelector(".menu_button").addEventListener("click", function(){
        menu.open = !menu.open;
    });

}
