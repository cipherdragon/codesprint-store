import Image from 'next/image';
import codesprintLogo from '../assets/codesprint-logo.webp';
import { Info, ShoppingBag } from 'react-feather';
import { useEffect } from 'react';

export default function SiteHeader() {
    return (
        <header className='proper-padded-container'>

        <div
            className='proper-padded-container flex justify-between p-[20px] 
                bg-[#fff] bg-opacity-10 border border-white border-opacity-15
                backdrop-blur-md shadow-lg shadow-neutral-900
                my-[20px] xsm:my-[30px] rounded-2xl items-center box-border w-auto'>
            <Image 
                src={codesprintLogo} 
                alt="Codesprint Logo" 
                className='max-h-[25px] w-[160px] min-[400px]:w-[200px]'/>
            <nav
                className='flex gap-[30px] items-center'>
                <ShoppingBag 
                    className='cursor-pointer w-[20px] xsm:w-[30px] xsm:h-[30px]'/>
                <Info
                    className='cursor-pointer w-[20px] xsm:w-[30px] xsm:h-[30px]'/>
            </nav>
        </div>

        </header>
    );
}