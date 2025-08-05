import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { world, system } from "@minecraft/server";

// Main Menu
export function mainMenu(player) {
    const form = new ActionFormData()
        .title("Main Menu")
        .body(`\nHello, ${player.name}!\n`)
        .button("About")
        .button("Warps")
        .button("Credits");

    form.show(player).then((response) => {
        if (response.canceled) return;

        switch (response.selection) {
            case 0:
                aboutMenu(player);
                break;
            case 1:
                warpMenu(player);
                break;
            case 2:
                creditsMenu(player);
                break;
        }
    });
}

// Warp Menu
export function warpMenu(player) {
    const form = new ActionFormData()
        .title("Warps")
        .body("Access various warps in the game.\n\n" +
              "Choose a warp to teleport to.\n" +
              "Currently available warps:\n" +
              "- Spawn\n" +
              "- Wilderness (Not available yet)\n")
        .button("TP to Spawn")
        .button("TP to Wilderness\n(Not Available Yet)")
        .button("Back to Main Menu");

    form.show(player).then((response) => {
        if (response.canceled) return;

        switch (response.selection) {
            case 0:
                player.teleport({ x: 0, y: 100, z: 0 }, {
                    dimension: world.getDimension("overworld"),
                });
                player.sendMessage("Teleported to Spawn!");
                break;
            case 1:
                player.sendMessage("This feature is not available yet.");
                break;
            case 2:
                mainMenu(player);
                break;
        }
    });
}

// About Menu
export function aboutMenu(player) {
    const form = new ActionFormData()
        .title("About")
        .body("This is a utility script for Minecraft Bedrock Edition.\nVersion: 1.0.0")
        .button("Close")
        .button("Back to Main Menu");

    form.show(player).then((response) => {
        if (response.canceled) return;
        if (response.selection === 1) {
            mainMenu(player);
        }
    });
}

// Credits Menu
export function creditsMenu(player) {
    const form = new ActionFormData()
        .title("Credits")
        .body("Made by Adem")
        .button("Close")
        .button("Back to Main Menu");

    form.show(player).then((response) => {
        if (response.canceled) return;
        if (response.selection === 1) {
            mainMenu(player);
        }
    });
}

// Chat trigger
world.beforeEvents.chatSend.subscribe((ev) => {
    if (ev.message === "!menu") {
        ev.cancel = true;
        mainMenu(ev.sender);
    }
});

// Register Command
system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
    customCommandRegistry.registerCommand(
        {
            name: "mainmenu",
            description: "Opens the main menu",
            permissionLevel: CommandPermissionLevel.Any,
        },
        (player, args) => {
            if (!player || player.typeId !== "minecraft:player") return;
            mainMenu(player);
        }
    );
});