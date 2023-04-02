import {CloudOutline, SettingsOutline} from "@vicons/ionicons5";
import {addMenuOptions} from "../plugins/menuOptions";


const modules = [
    {
        id: "tunnels",
        name: "PortIO",
        route: "modules.tunnels.index",
        icon: CloudOutline
    },
    {
        id: "settings",
        name: "设置",
        route: "settings",
        icon: SettingsOutline
    },
]

for (let i = 0; i < modules.length; i++) {
    addMenuOptions('top', modules[i].route, modules[i].name, modules[i].icon);
}