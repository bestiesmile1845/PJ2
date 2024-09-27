import React, { useState } from "react";
import { AdminsInterface } from "../../interface/IAdmin";
import { CreateAdmin } from "../../service/https/admin";

const CreateForm: React.FC = () => {
    const [formData, setFormData] = useState<AdminsInterface>({
        Firstname: "",
        Lastname: "",
        Username: "",
        Password: "",
        Email: "",
        GenderID: undefined,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof typeof formData
    ) => {
        setFormData({
            ...formData,
            [field]: field === 'GenderID' ? Number(e.target.value) : e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        try {
            console.log("Form Data:", formData);
            let res = await CreateAdmin(formData); // Send formData to API
            console.log(res);
            if (res) {
                alert('ข้อมูลของท่านเข้าสู่ระบบ');
                // Reset form or navigate user
            } else if (res.errors) {
                console.log('Errors:', res.errors);
                alert(`Submission failed: ${res.errors.join(', ')}`);
            } else {
                console.log('Unknown error occurred');
                alert('Submission failed, please try again.');
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert('Error saving data');
        }
    };

    return (
        <div className="text-2xl ">
            <h2 className="text-green-300 text-4xl mb-8 text-center">Admin</h2>
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
                            value={formData.Password}
                            onChange={(e) => handleInputChange(e, "Password")}
                            className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8 ">
                    <button
                        type="submit" // Set button type to submit
                        className="px-4 py-2 bg-hover text-white rounded"
                        aria-label="Confirm data submission"> Confirm Data
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateForm;
