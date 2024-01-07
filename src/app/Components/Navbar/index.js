"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { navItemsList } from "./utils";
import { useState } from "react";
import "./style.css";

export default function NavBar() {
  // get current url path
  //to be used for conditional styling
  const currentUrl = usePathname();
  // creating state for hiding and showing a responsive navbar on small screens
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(true);
  return (
    <nav className={"nav-container"}>
      <Link href="/" className="logo-text">
        A Store
      </Link>
      {/* shopping cart */}
      <Link href="/cart">
        <Image
          src="/bag-shopping.svg"
          width={20}
          height={20}
          alt="shopping bag"
        />
      </Link>

      {/* Search button link */}
      <Link href="/search">
        <Image src="/bag-shopping.svg" width={20} height={20} alt="search" />
      </Link>

      {/* menu-btn for small screen devices.
      menu btn is automatically hidden on large screen and vice verser.
      when it's clicked and the state, "showmenu", changes, menu-btn is hidden on small screns
      so as to now show the menu items list
      */}
      <button
        className={`menu-btn ${showMenu ? "hide" : "show"}`}
        onClick={() => {
          setShowMenu(true);
        }}
      >
        <Image src={"/menu-icon.svg"} width={20} height={20} alt="menu icon" />
      </button>

      {/* menu/navbar items list */}
      <div className={`nav-items-list ${showMenu && "show-nav-items-list"}`}>
        {navItemsList.map((navItem) => (
          <Link
            key={navItem.id}
            href={navItem.path}
            className={
              currentUrl != navItem.path
                ? "nav-item"
                : "nav-item active-link underline-text"
            }
          >
            {navItem.label}
          </Link>
        ))}

        {/* login btn and sign out btn */}
        {isLoggedin ? (
          <button
            className="primary-btn"
            onClick={() => {
              console.log("clicking");
              console.log(isLoggedin);
              setIsLoggedIn(false);
              console.log(isLoggedin);
            }}
          >
            Log out
          </button>
        ) : (
          <button className="primary-btn" onClick={() => {}}>
            Sign in
          </button>
        )}

        {/* close-menu-btn for closing menu on small screens.
        close-menu-btn btn gets hidden when it's clicked or once "showMenu" state 
        changes to true */}
        <button
          className={`close-menu-btn ${showMenu ? "show" : "hide"}`}
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <Image src="/xmark.svg" width={20} height={20} alt="close menu" />
        </button>
      </div>
    </nav>
  );
}
