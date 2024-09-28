import React, { useState, useEffect } from "react";
import { GetMemberById, UpdateMember, DeleteMemberByID } from "../../service/https/member";
import { GetPackages } from "../../service/https/package"; // Import package fetching service
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MembersInterface } from "../../interface/IMembers";
import { PackageInterface } from "../../interface/IPackage";

const EditForm: React.FC = () => {
    const [formData, setFormData] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        Username: "",
        Phonenumber: "",
        GenderID: undefined,
        Password: "",
        Age: "",
        TypeMember: "",
    });

    const [packages, setPackages] = useState<PackageInterface[]>([]); // State for packages
    const MemberID = localStorage.getItem('MemberID');
    const navigate = useNavigate();

    const GetMemberId = async () => {
        if (MemberID) {
            try {
                let res = await GetMemberById(Number(MemberID));
                console.log('Fetched Member:', res);
                
                if (!Array.isArray(res)) {
                    res = [res];
                }

                setFormData({
                    Firstname: res[0]?.Firstname || "",
                    Lastname: res[0]?.Lastname || "",
                    Email: res[0]?.Email || "",
                    Username: res[0]?.Username || "",
                    Phonenumber: res[0]?.Phonenumber || "",
                    GenderID: res[0]?.GenderID || undefined,
                    Password: "", // Don't show password in the form
                    Age: res[0]?.Age || "",
                    TypeMember: res[0]?.TypeMember || "",
                });
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        }
    };

    const GetPackagesList = async () => {
        try {
            const res = await GetPackages(); // Fetch package data
            setPackages(res); // Assuming res is an array of packages
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
    };

    useEffect(() => {
        GetMemberId();
        GetPackagesList(); // Fetch packages on mount
    }, []);

    const handleDelete = async () => {
        toast((t) => (
            <div>
                <p>Are you sure you want to delete this member?</p>
                <div className="flex space-x-2">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            let res = await DeleteMemberByID(Number(MemberID));
                            if (res) {
                                toast.success("Successfully deleted!");
                                setTimeout(() => navigate("/ListMember"), 2000);
                            } else {
                                toast.error("Please try again.");
                            }
                        }}
                        className="bg-blue-600 text-white py-1 px-3 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-600 text-red py-1 px-3 rounded"
                    >
                        No
                    </button>
                </div>
            </div>
        ), { duration: Infinity });
    };

    const handleUpdateMember = async (value: MembersInterface) => {
        let res = await UpdateMember(Number(MemberID), value);
        if (res) {
            toast.success("Member updated successfully!");
            setTimeout(() => navigate("/ListMember"), 2000);
        } else {
            toast.error("Update failed. Please try again.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof typeof formData) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUpdateMember(formData); // Call the update function
    };

    return (
        <div className="text-2xl">
            <h2 className="text-green-300 text-4xl mb-8 text-center">Edit Member</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-green-300 mb-2">First Name</label>
                        <input
                            id="FirstName"
                            type="text"
                            required
                            autoComplete="FirstName"
                            placeholder="First Name"
                            value={formData.Firstname}
                            onChange={(e) => handleInputChange(e, "Firstname")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-green-300 mb-2">Last Name</label>
                        <input
                            id="LastName"
                            type="text"
                            required
                            autoComplete="LastName"
                            placeholder="Last Name"
                            value={formData.Lastname}
                            onChange={(e) => handleInputChange(e, "Lastname")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-green-300 mb-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
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
                            required
                            value={formData.GenderID}
                            onChange={(e) => handleInputChange(e, "GenderID")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        >
                            <option value="">Select Gender</option>
                            <option value={1}>Female</option>
                            <option value={2}>Male</option>
                        </select>
                    </div>
                    {/* Username */}
                    <div>
                        <label className="block text-green-300 mb-2">Username</label>
                        <input
                            id="username"
                            type="text"
                            required
                            autoComplete="username"
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
                            type="password"
                            required
                            autoComplete="password"
                            placeholder="Enter password"
                            value={formData.Password}
                            onChange={(e) => handleInputChange(e, "Password")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                    {/* Phone Number */}
                    <div>
                        <label className="block text-green-300 mb-2">Phone Number</label>
                        <input
                            id="PhoneNumber"
                            type="text"
                            required
                            placeholder="Enter Phone Number"
                            value={formData.Phonenumber}
                            onChange={(e) => handleInputChange(e, "Phonenumber")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                    {/* Age */}
                    <div>
                        <label className="block text-green-300 mb-2">Age</label>
                        <input
                            id="Age"
                            type="text"
                            required
                            placeholder="Enter your age"
                            value={formData.Age}
                            onChange={(e) => handleInputChange(e, "Age")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                    {/* Type Member */}
                    <div>
                        <label className="block text-green-300 mb-2">Type Member</label>
                        <select
                            value={formData.TypeMember}
                            onChange={(e) => handleInputChange(e, "TypeMember")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        >
                            <option value="">Select Type Member</option>
                            {packages.map((pkg) => (
                                <option key={pkg.ID} value={pkg.PackageName}>{pkg.PackageName}</option> // Adjust according to your package structure
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-600 text-white py-2 px-6 rounded-lg"
                    >
                        Delete
                    </button>
                    <button
                        type="submit" // Changed to submit to trigger handleSubmit
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

export default EditForm;
