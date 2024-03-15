import React from "react";

function Header() {
  return (
    <>
        <header>
            <div className="logoSection">
                <img src="../../icons/logo1.png" alt="" />
            </div>
            <div className="searchSetting">
                <div className="searchBar">
                    <img src="../../icons/search.png" alt="" />
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
                <div className="setting">
                    <img src="../../icons/setting.png" alt="" />
                    <div className="profile">
                        <img src="../../doctors/IMG_1001.png" alt="" />
                    </div>
                </div>
            </div>
        </header>
    </>
  );
}

export default Header;
