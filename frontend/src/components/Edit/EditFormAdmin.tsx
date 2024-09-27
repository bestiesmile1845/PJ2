import React, { useState, useEffect } from "react";
import { GetAdminById, UpdateAdminById } from "../../service/https/admin";
import { DeleteAdminByID } from "../../service/https/admin";
import toast, { Toaster } from "react-hot-toast"; // Import toast functions
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AdminsInterface } from "../../interface/IAdmin";

const EditFrom: React.FC = () => {
    const [formData, setFormData] = useState({
        Firstname: "",
        Lastname: "",
        Username: "",
        Password: "",
        Email: "",
        GenderID: undefined,
    });
    
    const AdminID = localStorage.getItem('AdminID');
    const navigate = useNavigate();

    const GetAdminID = async () => {
        if (AdminID) {
            let res = await GetAdminById(Number(AdminID));
            if (!Array.isArray(res)) {
                res = [res];
            }
            // กำหนดค่าให้ formData ด้วยข้อมูลที่ได้จาก API
            setFormData({
                Firstname: res[0]?.Firstname || "",
                Lastname: res[0]?.Lastname || "",
                Username: res[0]?.Username || "",
                Password: "", // ไม่ควรแสดงรหัสผ่านในฟอร์ม
                Email: res[0]?.Email || "",
                GenderID: res[0]?.GenderID || undefined,
            });
        }
    };
    
    const handleDelete = async () => {
        toast((t) => (
            <div>
                <p>Are you sure you want to delete this admin?</p>
                <div className="flex space-x-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id); // Close the toast
                            let res = await DeleteAdminByID(Number(AdminID));
                            if (res) {
                                toast.success("Successfully deleted!");
                                setTimeout(function () {
                                    navigate("/ListAdmin");}, 2000);
                            } else {
                                toast.error("Please try again.");
                            }
                        }}
                        className="bg-blue-600 text-white py-1 px-3 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)} // Close the toast
                        className="bg-gray-600 text-red py-1 px-3 rounded"
                    >
                        No
                    </button>
                </div>
            </div>
        ), {
            duration: Infinity, // Keep the toast open
        });
    };
    
    const handleUpdateAdmin = async(value:AdminsInterface) =>{
        let res = await UpdateAdminById(Number(AdminID),value);
        if (res){
            toast.success("Admin updated successfully!");
            setTimeout(function () {
            navigate("/ListAdmin");}, 2000);
        }
        else{
            toast.error("Please try again.");
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof typeof formData
    ) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    useEffect(() => {
        GetAdminID();
    }, []); // เพิ่ม [] เพื่อให้ทำงานเพียงครั้งเดียวเมื่อ Component ถูกติดตั้ง

    return (
        <div className="text-2xl">
            <h2 className="text-green-300 text-4xl mb-8 text-center">Edit Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-green-300 mb-2">Name</label>
                        <input
                            id="FirstName"
                            name="FirstName"
                            type="text"
                            required
                            autoComplete="FirstName"
                            placeholder="FirstName"
                            value={formData.Firstname}
                            onChange={(e) => handleInputChange(e, "Firstname")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            id="LastName"
                            name="LastName"
                            type="text"
                            required
                            autoComplete="LastName"
                            placeholder="LastName"
                            value={formData.Lastname}
                            onChange={(e) => handleInputChange(e, "Lastname")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none mt-10"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-green-300 mb-2">Email</label>
                        <input
                            id="email"
                            name="email"
                            required
                            autoComplete="email"
                            type="text"
                            placeholder="Enter your email"
                            value={formData.Email}
                            onChange={(e) => handleInputChange(e, "Email")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-green-300 mb-2">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            required
                            autoComplete="gender"
                            value={formData.GenderID}
                            onChange={(e) => handleInputChange(e, "GenderID")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        >
                            <option value="">none</option>
                            <option value={1}>Female</option>
                            <option value={2}>Male</option>
                        </select>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-green-300 mb-2">Username</label>
                        <input
                            id="username"
                            name="username"
                            required
                            autoComplete="username"
                            type="text"
                            placeholder="Enter username"
                            value={formData.Username}
                            onChange={(e) => handleInputChange(e, "Username")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-green-300 mb-2">Password</label>
                        <input
                            id="password"
                            name="password"
                            required
                            autoComplete="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.Password} // ไม่ควรแสดงรหัสผ่านในฟอร์ม
                            onChange={(e) => handleInputChange(e, "Password")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    
                   <button
                        type="button"
                        onClick={handleDelete}
                        
                        className="bg-red-600 text-white py-2 px-6 rounded-lg focus:outline-none hover:bg-black"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUpdateAdmin(formData)} // Pass formData here
                        className="bg-hover text-black py-2 px-6 rounded-lg focus:outline-none hover:!bg-green"
                    >
                        Update
                    </button>

                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default EditFrom;
