
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    PRODUCT_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    USER_ROUTE,
    CATALOG_ROUTE,
    CATALOG_RESULT_ROUTE,
    ACCESS_ROUTE,
    CONFIRM_ROUTE,
    NEWPASS_ROUTE,
    CHECK_ROUTE,
    SEARCH_ROUTE,
    DOSTAVKA_ROUTE,
    OPLATA_ROUTE,
    OPLATA_1_ROUTE,
    MAGAZIN_ROUTE
} from "./utils/consts";
import Basket from "./pages/Basket";
import User from "./pages/User";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Catalog from "./pages/Catalog";
import CatalogResult from "./pages/CatalogResult";
import Access from "./pages/MailAcces";
import Confirm from "./pages/Confirm";
import NewPass from "./pages/NewPass";
import CheckMail from "./pages/CheckMail";
import SearchPage from "./pages/SearchPage";
import Dostavka from "./pages/Dostavka";
import Oplata from "./pages/Oplata";
import Oplata_1 from "./pages/Oplata_1";
import OMagazine from "./pages/OMagazine";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CATALOG_RESULT_ROUTE+'/:par'+ '/:category'+ '/:sex',
        Component: CatalogResult
    },
    {
        path:ACCESS_ROUTE,
        Component: Access
    },
    {
        path:CONFIRM_ROUTE,
        Component: Confirm
    },
    {
        path:NEWPASS_ROUTE,
        Component: NewPass
    },
    {
        path:CHECK_ROUTE,
        Component: CheckMail
    },
    {
        path:SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path:USER_ROUTE,
        Component: User
    },
    {
        path:DOSTAVKA_ROUTE,
        Component: Dostavka
    },
    {
        path:OPLATA_ROUTE,
        Component: Oplata
    },
    {
        path:OPLATA_1_ROUTE,
        Component: Oplata_1
    },
    {
        path:MAGAZIN_ROUTE,
        Component: OMagazine
    }
]