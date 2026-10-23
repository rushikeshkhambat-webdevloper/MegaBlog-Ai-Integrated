import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="py-3 shadow bg-slate-900 text-white sticky top-0 z-40">
            <Container>
                <nav className="flex items-center justify-between flex-wrap gap-3">
                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <ul className="flex items-center gap-1 sm:gap-2 ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-3 py-2 text-sm sm:text-base duration-200 hover:bg-slate-800 rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        
                        {authStatus ? (
                            <li>
                                <LogoutBtn />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="inline-block px-3 py-2 text-sm sm:text-base duration-200 hover:bg-slate-800 rounded-full"
                                    >
                                        Login
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="inline-block px-4 py-2 text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 rounded-full duration-200"
                                    >
                                        Sign Up
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;