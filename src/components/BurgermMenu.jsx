import React, { useState } from 'react';
import './css/burger.css';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from 'react-icons/io5';
import { CiCalculator1 } from "react-icons/ci";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { RiTruckLine } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import { BsQrCodeScan } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";

function BurgerMenu() {
    const [burger, setBurger] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="menu-nav">
            <div className="burger-menu">
                <div className="block-nav-1">
                    <h1>{user ? `${user.user_name} ${user.user_surname}` : ''}</h1>
                </div>
                <div className='block-burger-menu' onClick={() => setBurger(!burger)} >
                    {burger ? <IoClose size={25} /> : <GiHamburgerMenu size={25} />}
                </div>
            </div>
            <div className={burger ? 'nav-main, nav-main-active' : 'nav-main'}>
                <div className="navigete">
                    <Link to='/QRcodeScanner'> <div className="button-link"><BsQrCodeScan /><h3>Сканировать документ</h3></div></Link>
                    <Link to='/invoice'> <div className="button-link"><CiCalculator1 /> <h3>Подсчет остатков</h3></div></Link>
                    <Link to='/inventory'><div className="button-link"><TbFileInvoice /><h3>Накладная</h3></div></Link>{/* //Временно */}
                    <Link to='/app'><div className="button-link"><LiaDoorOpenSolid /><h3>Принять смену</h3></div></Link>
                    <Link to='/app'><div className="button-link"><RiTruckLine /><h3>Создать перемещение</h3></div></Link>
                    <Link to='/app'><div className="button-link"><ImExit /><h3>Сдать смену</h3></div></Link>
                    <Link to='/app'><div className="button-link"><FiSettings /><h3>Настройки</h3></div></Link>
                </div>
            </div>
        </div>
    );
}

export default BurgerMenu;
