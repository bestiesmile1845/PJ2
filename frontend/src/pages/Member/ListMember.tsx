import React from "react";
import Nav from "../../components/manu/Nav";
import SideBar from "../../components/admin/class/SideBar";
// import { GrAddCircle } from "react-icons/gr";
import TableList from "../../components/tablelist/Membertablelist"
// import { Link } from 'react-router-dom';

const ClassCreate: React.FC = () => {
   

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Nav title="" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2 text-secondary">List Member</h1>

                    </div>

                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="flex flex-row items-start m-8 text-secondary ">
                        <TableList/> 
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ClassCreate;
