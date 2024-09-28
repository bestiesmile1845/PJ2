import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetMemberById } from "../../../service/https/member";
import { GetAdminById } from "../../../service/https/admin";

interface UserInterface {
    Firstname: string;
    Lastname: string;
    // Add other properties if needed
}

interface NavbarProps {
    title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState<UserInterface | null>(null); // Specify the type here
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("id");
            const userRole = localStorage.getItem("role");

            if (userId && userRole) {
                try {
                    let fetchedUserData: UserInterface | null = null; // Declare the variable outside

                    if (userRole === "member") {
                        fetchedUserData = await GetMemberById(Number(userId));
                    } else if (userRole === "admin") {
                        fetchedUserData = await GetAdminById(Number(userId));
                    }

                    // Assign the fetched user data or default value
                    setUserData(fetchedUserData || { Firstname: "-", Lastname: "-" });
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setUserData({ Firstname: "-", Lastname: "-" }); // Default value
                }
            } else {
                setUserData({ Firstname: "-", Lastname: "-" }); // Default value
            }
        };

        fetchUserData();
    }, []);
    console.log(userData)

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="bg-black w-full">
            <div className="navbar bg-black h-[76px] flex items-center border-b-4 border-white">
                <h1 className="text-xl text-green1 ml-14">{title}</h1>
                <div className="flex items-center ml-auto mr-14 relative">
                    <div
                        className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                            {userData 
                                ? `${(userData.Firstname || '').charAt(0)}${(userData.Lastname || '').charAt(0)}`.toUpperCase() 
                                : "JL"}
                        </span>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-[185px] w-48 bg-gray4 bg-opacity-95 border border-green3 rounded-lg shadow-lg z-10">
                            <ul className="text-white p-2">
                                <li className="p-2 border-b-2">
                                    {userData ? `${userData.Firstname} ${userData.Lastname}` : "Settings"}
                                </li>
                                <li className="p-2 hover:bg-green5 cursor-pointer">Profile</li>
                                <li className="p-2 hover:bg-green5 cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
