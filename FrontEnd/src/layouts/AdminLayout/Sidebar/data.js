import { SlHome } from "react-icons/sl";
import { LuUser2, LuUsers2  } from "react-icons/lu";
import { PiShoppingCart } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineBackup } from "react-icons/md";
export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/admin/dashboard",
        icon: SlHome,
      },
      // {
      //   id: 2,
      //   title: "Profile",
      //   url: "/admin/profile",
      //   icon: LuUser2,
      // },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/admin/accounts",
        icon: LuUsers2,
      },
      {
        id: 2,
        title: "Products",
        url: "/admin/products",
        icon: PiShoppingCart,
      },
      {
        id: 3,
        title: "Orders",
        url: "/admin/orders",
        icon: MdOutlineEventNote,
      },
      {
        id: 4,
        title: "Blogs",
        url: "/admin/blogs",
        icon: BsFileEarmarkPostFill,
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Add product",
        url: "/admin/product/create",
        icon: MdFormatListBulletedAdd,
      },
      {
        id: 2,
        title: "Add blog",
        url: "/admin/blog/create",
        icon: MdPostAdd,
      },
    ],
  },
  // {
  //   id: 4,
  //   title: "Maintenance",
  //   listItems: [
  //     {
  //       id: 1,
  //       title: "Settings",
  //       url: "/",
  //       icon: IoSettingsOutline,
  //     },
  //     {
  //       id: 2,
  //       title: "Backups",
  //       url: "/",
  //       icon: MdOutlineBackup,
  //     },
  //   ],
  // },
 
];

