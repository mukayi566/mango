'use client';

import { useState, useCallback } from "react";
import Avatar from "../Avatar";
import {AiOutlineMenu} from 'react-icons/ai';
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut} from 'next-auth/react';
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";


interface UserMenuProps {
  currentUser?: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
    const registerModal = useRegisterModal();
    const router = useRouter();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setisOpen] = useState(false);
    
    const toggleOpen = useCallback(() =>{
        setisOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
      if(!currentUser) {
       return loginModal.onOpen();
      }

      rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);


    return (
        <div
          className="relative"
        >
            <div className="flex flex-row items-center gap-3 ">
                <div
                  onClick={onRent}
                  className="
                  hidden 
                  md:block 
                  text-sm 
                  font-semibold 
                  py-3 
                  px-4 
                  rounded-full 
                  hover:bg-neutral-100  
                  transition cursor-pointer " 
                >
                    Add your bedspace
                </div>
                <div
                 onClick={toggleOpen} 
                 className="
                   p-4
                   md:py-1
                   md:px-2
                   border-[1px]
                   border-neutral-200
                   flex
                   fle-row
                   items-center
                   gap-3
                   rounded-full
                   cursor-pointer
                   hover:shadow-md
                   transition

                 "
                >
                    <AiOutlineMenu />
                    <div
                      className="Hidden md:block"
                    >
                      <Avatar src=""/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                  className="
                    absolute
                    rounded-xl
                    shodow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                  "
                >
                    <div
                      className="flex flex-col cursor-pointer"
                    >
                      {currentUser ?(
                        <>
                        <MenuItem 
                          onClick={() => router.push("/trips")}
                          label="Reserved bedspace"
                        />
                        <MenuItem 
                          onClick={() => router.push("/favorites")}
                          label="My favorites"
                        />
                          <MenuItem 
                            onClick={() => router.push("/reservations") }
                            label="Reservations on your property"
                          />
                          <MenuItem 
                            onClick={() => router.push("/properties")}
                            label="My properties"
                          />
                          <MenuItem 
                            onClick={rentModal.onOpen}
                            label="Add your bedspace"
                          />
                          <hr />
                          <MenuItem 
                            onClick={() => signOut()}
                            label="Logout"
                          />
                      </>
                      ): (
                        <>
                          <MenuItem 
                            onClick={loginModal.onOpen}
                            label="Login"
                          />
                          <MenuItem 
                            onClick={registerModal.onOpen}
                            label="Sign up"
                          />
                        </>
                      )}
                    </div>  
                </div>
            )}
        </div>
    )
}

export default UserMenu;
