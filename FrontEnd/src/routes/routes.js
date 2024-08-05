import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import { Dashboard, CreateProduct, CreateBlog, ListProducts, EditProduct, EditBlog, ListBlogs, ListUsers, ListOrders, adminOrderDetail } from "../pages/Admin";
import Inquiries from "../components/Footer/SupportLinks/Inquiries/Inquiries";
import ExchangeReturn from "../components/Footer/SupportLinks/ExchangeReturn/ExchangeReturn";
import Size from "../components/Footer/SupportLinks/Size/Size";
import Payment from "../components/Footer/SupportLinks/Payment/Payment";
import Collaborator from "../components/Footer/SupportLinks/Collaborator/Collaborator";
import RetailAdvice from "../components/Footer/SupportLinks/RetailAdvice/RetailAdvice";
import Gift from "../components/Footer/SupportLinks/Gift/Gift";
import CollabPolicies from "../components/Footer/Policies/CollabPolicies/CollabPolicies";
import ExchangePolicies from "../components/Footer/Policies/ExchangePolicies/ExchangePolicies";
import MembershipPolicies from "../components/Footer/Policies/MembershipPolicies/Membership";
import PaymentPolicies from "../components/Footer/Policies/PaymentPolicies/PaymentPolicies";
import PurcharePolicies from "../components/Footer/Policies/PurchasePolicies/PurchasePolicies";
import SecurityPolicies from "../components/Footer/Policies/SecurityPolicies/SecurityPolicies";
import StockPolicies from "../components/Footer/Policies/StockPolicies/StockPolicies";

import {
  Home,
  AllProducts,
  Login,
  Register,
  Account,
  Orders,
  ChangePass,
  Address,
  ChainStore,
  Contact,
  ProductCart,
  CheckOut,
  News,
  NewsDetail,
  Forgot,
  ResetPass,
  OTP,
  ProductDetail,
  OrderDetail,
  PaymentStatus,
  OrderSuccess,
} from "../pages";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/menu",
    component: "",
  },
  {
    path: "/cart",
    component: ProductCart,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgot",
    component: Forgot,
  },
  {
    path: "/otp",
    component: OTP,
  },
  {
    path: "/reset",
    component: ResetPass,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/account/orders",
    component: Orders,
  },
  {
    path: "/account/changepass",
    component: ChangePass,
  },
  {
    path: "/account/address",
    component: Address,
  },
  {
    path: "/chainstore",
    component: ChainStore,
  },
  {
    path: "/checkout",
    component: CheckOut,
  },
  {
    path: "/contact-support",
    component: Contact,
  },
  {
    path: "/blogs",
    component: News,
  },
  {
    path: "/blog/:slug",
    component: NewsDetail,
  },
  {
    path: "/inquiries-support",
    component: Inquiries,
  },
  {
    path: "/exchange-support",
    component: ExchangeReturn,
  },
  {
    path: "/size-support",
    component: Size,
  },
  {
    path: "/payment-support",
    component: Payment,
  },
  {
    path: "/collab-support",
    component: Collaborator,
  },
  {
    path: "/advice-support",
    component: RetailAdvice,
  },
  {
    path: "/gift-support",
    component: Gift,
  },
  {
    path: "/collab-policies",
    component: CollabPolicies,
  },
  {
    path: "/exchange-policies",
    component: ExchangePolicies,
  },
  {
    path: "/membership-policies",
    component: MembershipPolicies,
  },
  {
    path: "/payment-policies",
    component: PaymentPolicies,
  },
  {
    path: "purchase-policies",
    component: PurcharePolicies,
  },
  {
    path: "security-policies",
    component: SecurityPolicies,
  },
  {
    path: "stock-policies",
    component: StockPolicies,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/products",
    component: AllProducts,
  },
  {
    path: "/products/:keyword",
    component: AllProducts,
  },
  {
    path: "/product/detail/:slug",
    component: ProductDetail,
  },
  {
    path: "/order/status",
    component: PaymentStatus,
  },
  {
    path: "/order-detail/:orderId",
    component: OrderDetail,
  },
  {
    path: "/order/success",
    component: OrderSuccess,
  },
];
const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
    layout: AdminLayout,
  },

  {
    path: "/admin/product/create",
    component: CreateProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/product/edit/:slug",
    component: EditProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/products",
    component: ListProducts,
    layout: AdminLayout,
  },
  {
    path: "/admin/blog/create",
    component: CreateBlog,
    layout: AdminLayout,
  },
  {
    path: "/admin/blog/edit/:slug",
    component: EditBlog,
    layout: AdminLayout,
  },
  {
    path: "/admin/blogs",
    component: ListBlogs,
    layout: AdminLayout,
  },
  {
    path: "/admin/accounts",
    component: ListUsers,
    layout: AdminLayout,
  },
  {
    path: "/admin/orders",
    component: ListOrders,
    layout: AdminLayout,
  },
  {
    path: "/admin/order-detail/:orderId",
    component: adminOrderDetail,
    layout: AdminLayout,
  },
];
export { routes, adminRoutes };
