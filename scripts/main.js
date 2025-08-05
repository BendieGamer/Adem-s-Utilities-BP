import { ActionFormData, ModalFormData } from "minecraft/server-ui";
import { world } from "minecraft/server";

export function mainMenu() {
    const form = new ActionFormData()
        .title("Main Menu")
        .body(`\nHello, ${player.name}!\n`)
        .button("About")
        .button("Warps")
        .button("Credits");

        form.showPlayer(player).then((response) => {
            if (response.selection === 0) {
                aboutMenu(player);
            } else if (response.selection === 1) {
                warpMenu(player);
            } else if (response.selection === 2) {
                creditsMenu(player);
            }
        });
}