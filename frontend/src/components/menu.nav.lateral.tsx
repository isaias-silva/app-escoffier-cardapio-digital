import { useEffect, useRef, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import Link from "next/link";
import { logout } from "../app/api/services/restaurant.service";

export function LateralNavMenu() {
    const [open, setOpen] = useState<boolean>(false)
    const popupRef = useRef<HTMLObjectElement>(null);
    const [isMouseInside, setIsMouseInside] = useState(false);

    useEffect(() => {
    
        document.addEventListener('mousedown', closeOrNot);
        return () => {
          document.removeEventListener('mousedown',closeOrNot);
        };
       
      }, [open, isMouseInside]);

    function closeOrNot(event: any) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpen(false)

    
        }
    }
    return (
        <div>
            <nav ref={popupRef} className={`text-xl fixed top-0 left-0 sm:w-1/4 w-full z-50 bg-orange-300 h-screen transition-all duration-300 ${open ? 'ml-0' : 'ml-[-100%]'} shadow-xl`} >
                <button onClick={() => setOpen(false)}><ClearIcon /></button>
                <ul>
                <li className="mb-2">
                        <Link className="flex items-center  hover:bg-orange-400 hover:text-white transition-all duration-300 p-2" href="/dashboard">
                            <HomeIcon className="mr-2" />Home

                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link className="flex items-center  hover:bg-orange-400 hover:text-white transition-all duration-300 p-2" href="/dashboard/edit">
                            <AccountCircleIcon className="mr-2" />Perfil

                        </Link>
                    </li>
                  
                    <li className="mb-2">
                        <Link className="flex items-center  hover:bg-orange-400 hover:text-white transition-all duration-300 p-2" href="/">
                            <RamenDiningIcon className="mr-2" />Meus Pratos

                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link className="flex items-center  hover:bg-orange-400 hover:text-white transition-all duration-300 p-2" href="/">

                            <BarChartIcon className="mr-2" />Gráficos
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link className="flex items-center  hover:bg-orange-400 hover:text-white transition-all duration-300 p-2" href="/">
                            <QrCode2Icon className="mr-2" /> QR Code

                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link className="flex items-center  hover:bg-orange-400 hover:text-white transition-all duration-300 p-2" href="/" onClick={() => logout()}>

                            <LogoutIcon className="mr-2" />Sair
                        </Link>
                    </li>
                </ul>
            </nav>
            <button className={`${open ? 'hidden' : 'block'}  absolute top-0 left-0 bg-orange-300 w-[40px] h-[40px] z-50 rounded-lg`} onClick={() => setOpen(true)}><MenuIcon /></button>
        </div>
    );
}
