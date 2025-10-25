import React from 'react'
import AdminNavbar from '../ui-admin/components/adminNavbar/adminNavbar'
import { Suspense } from 'react';




const Admin= ({ children }) => {

    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="">

            <Suspense fallback="">
                <AdminNavbar />
                <div className="mainAdminLayout rtl">
                    <div style={{ zIndex: "100" }}> 
                    {children}
                    </div>
                </div>
                <div className="row" style={{ background: "#fff", height: "10%", paddingTop: "2%" }}>
                    <div style={{ border:"#1d1d18 1px solid"}} className=" col-10 offset-1 offset-md-2 col-md-8 lineinfooter order-md-6"/>
                  
                    <div className={`col-12 col-md-12 right-reserve order-md-7 `}>
                        <p type="button" onClick={scrollTop} style={{ color: "#000" }} > العودة للأعلى</p>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}

export default Admin;