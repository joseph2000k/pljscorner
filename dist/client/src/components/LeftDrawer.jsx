"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Drawer_1 = __importDefault(require("@mui/material/Drawer"));
const List_1 = __importDefault(require("@mui/material/List"));
const Divider_1 = __importDefault(require("@mui/material/Divider"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemButton_1 = __importDefault(require("@mui/material/ListItemButton"));
const ListItemIcon_1 = __importDefault(require("@mui/material/ListItemIcon"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const MoveToInbox_1 = __importDefault(require("@mui/icons-material/MoveToInbox"));
const Mail_1 = __importDefault(require("@mui/icons-material/Mail"));
const Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const react_router_dom_1 = require("react-router-dom");
const PointOfSale_1 = __importDefault(require("@mui/icons-material/PointOfSale"));
const Category_1 = __importDefault(require("@mui/icons-material/Category"));
const FormatListBulleted_1 = __importDefault(require("@mui/icons-material/FormatListBulleted"));
function LeftDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" &&
            (event.key === "Tab" ||
                event.key === "Shift")) {
            return;
        }
        setState(Object.assign(Object.assign({}, state), { [anchor]: open }));
    };
    const list = (anchor) => (<Box_1.default sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List_1.default>
        <ListItem_1.default disablePadding>
          <ListItemButton_1.default component={react_router_dom_1.Link} to="/">
            <ListItemIcon_1.default>
              <PointOfSale_1.default />
            </ListItemIcon_1.default>
            <ListItemText_1.default primary="Sales"/>
          </ListItemButton_1.default>
        </ListItem_1.default>
        <ListItem_1.default disablePadding>
          <ListItemButton_1.default component={react_router_dom_1.Link} to="/items">
            <ListItemIcon_1.default>
              <FormatListBulleted_1.default />
            </ListItemIcon_1.default>
            <ListItemText_1.default primary="Items"/>
          </ListItemButton_1.default>
        </ListItem_1.default>
        <ListItem_1.default disablePadding>
          <ListItemButton_1.default component={react_router_dom_1.Link} to="/category">
            <ListItemIcon_1.default>
              <Category_1.default />
            </ListItemIcon_1.default>
            <ListItemText_1.default primary="Category"/>
          </ListItemButton_1.default>
        </ListItem_1.default>
      </List_1.default>
      <Divider_1.default />
      <List_1.default>
        <ListItem_1.default disablePadding>
          <ListItemButton_1.default component={react_router_dom_1.Link} to="/receipts">
            <ListItemIcon_1.default>
              <Category_1.default />
            </ListItemIcon_1.default>
            <ListItemText_1.default primary="Receipts"/>
          </ListItemButton_1.default>
        </ListItem_1.default>
      </List_1.default>
      <Divider_1.default />
      <List_1.default>
        <ListItem_1.default disablePadding>
          <ListItemButton_1.default component={react_router_dom_1.Link} to="/dashboard">
            <ListItemIcon_1.default>
              <Category_1.default />
            </ListItemIcon_1.default>
            <ListItemText_1.default primary="Dashboard"/>
          </ListItemButton_1.default>
        </ListItem_1.default>
      </List_1.default>
      <List_1.default>
        {["Discounts", "Settings"].map((text, index) => (<ListItem_1.default key={text} disablePadding>
            <ListItemButton_1.default>
              <ListItemIcon_1.default>
                {index % 2 === 0 ? <MoveToInbox_1.default /> : <Mail_1.default />}
              </ListItemIcon_1.default>
              <ListItemText_1.default primary={text}/>
            </ListItemButton_1.default>
          </ListItem_1.default>))}
      </List_1.default>
    </Box_1.default>);
    return (<div>
      {["left"].map((anchor) => (<React.Fragment key={anchor}>
          <IconButton_1.default size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={toggleDrawer(anchor, true)}>
            <Menu_1.default />
          </IconButton_1.default>
          <Drawer_1.default anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer_1.default>
        </React.Fragment>))}
    </div>);
}
exports.default = LeftDrawer;
