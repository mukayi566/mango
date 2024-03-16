'use client'

import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiWindmill, GiIsland } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import {useSearchParams, usePathname } from 'next/navigation';



export const categories =[
    {
        label: 'Barlastone park',
        icon: TbBeach,
        description: 'This property is within barlastone park'
    },
    {
        label: 'King George',
        icon: GiWindmill,
        description: 'This property is around King George'
    },
    {
        label: 'Eden',
        icon: MdOutlineVilla,
        description: 'This property is within school campus'
    },
    {
        label: 'Zingalume',
        icon: TbMountain,
        description: 'This property is in Zingalume'
    },
    {
        label: 'Blue Bell',
        icon: TbPool,
        description: 'This property is about Blue bell'
    },
    {
        label: 'Unicohs',
        icon: GiIsland,
        description: 'This property is about Unicohs'
    },

]

const Categories = () => {

    const params = useSearchParams();
    const category = params?.get('category');

    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage ) {
        return null;
    }

    return (
        <Container>
            <div
              className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
              "
            >
                {categories.map((item) => (
                    <CategoryBox
                      key={item.label}
                      label= {item.label}
                      selected= {category === item.label}
                      icon={item.icon}
                      />
                ))}
            </div>
        </Container>
    )
}

export default Categories;

