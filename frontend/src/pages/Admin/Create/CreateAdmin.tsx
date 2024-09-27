import React from "react";
import Nav from "../../../components/manu/Nav";
import SideBar from "../../../components/admin/class/SideBar";
import CreateForm from "../../../components/Create/CreateForm";


const CreateAdmin: React.FC = () => {
   

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Nav title="" />
                <div>
                    <div className=" navbar bg-black h-[76px] flex justify-between items-center px-4 py-2">
                        <h1 className="text-3xl text-green1 ml-14 mt-2 text-secondary">Create Admin</h1>
                    </div>

                </div>
                <div className="flex flex-wrap justify-center">
                    <div className=" mt-5 w-[1500px] h-[1000px] rounded-3xl overflow-auto scrollable-div flex justify-center bg-sidebar backdrop-blur-sm">
                        <div className="flex flex-row items-start m-8 text-secondary ">
                             <CreateForm />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CreateAdmin;
