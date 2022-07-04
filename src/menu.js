import React, { useState } from 'react';
import './menu.css'

// function toggleClass() {
//     if (element.classList.contains(stringClass))
//         element.classList.remove(stringClass);
//     else
//         element.classList.add(stringClass);
// }

function Menu({DB}) {
    const [bodyClass, setClass] = useState("menu")
    let checked = true;
    return (
        <div className={bodyClass}>
            <div className="menu-icon"
                onClick={() => {bodyClass==="menu"?setClass("menu nav-active"):setClass("menu"); checked=true;}}
            >
                <span className="menu-icon__line menu-icon__line-left"></span>
                <span className="menu-icon__line"></span>
                <span className="menu-icon__line menu-icon__line-right"></span>
            </div>
                <div className="nav">
                    <div className="nav__content">
                        <ul className="nav__list">
                            {checked?<>
                            <li className="nav__list-item">Home</li>
                            <li className="nav__list-item">About</li>
                            <li className="nav__list-item" onClick={() => checked=false}>View Matjip</li>
                            <li className="nav__list-item">Contact</li>
                            </>: ""
                            }
                        </ul>
                    </div>
                </div>
        </div>
    );
}

export default Menu;