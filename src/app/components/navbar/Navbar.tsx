'use client';

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from './Categories'

interface NavbarProps {
    currentUser? : SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {

    return (
        <div className="fixed w-full backdrop-blur-sm bg-white/30 z-2 shadow-sm">
            <div className="py-3.5 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo/>
                        <Search />
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
    )
}

export default Navbar;
