"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const POS_1 = __importDefault(require("./pages/POS"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const PrivateRoute_1 = __importDefault(require("./components/routing/PrivateRoute"));
const Items_1 = __importDefault(require("./pages/Items"));
const Category_1 = __importDefault(require("./pages/Category"));
const ReceiptPage_1 = __importDefault(require("./pages/ReceiptPage"));
function App() {
    return (<>
      <Navbar_1.default />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<PrivateRoute_1.default />}>
          <react_router_dom_1.Route path="/" element={<POS_1.default />}/>
          <react_router_dom_1.Route path="/items" element={<Items_1.default />}/>
          <react_router_dom_1.Route path="/category" element={<Category_1.default />}/>
          <react_router_dom_1.Route path="/receipts" element={<ReceiptPage_1.default />}/>
        </react_router_dom_1.Route>
        <react_router_dom_1.Route path="/login" element={<LoginPage_1.default />}/>
      </react_router_dom_1.Routes>
    </>);
}
exports.default = App;
