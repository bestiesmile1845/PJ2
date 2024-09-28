import React, { useState } from "react";

const CreateForm: React.FC = () => {
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        UserName: "",
        PhoneNumber: "",
        GenderID: undefined,
        Password: "",
        Age: "",
    });

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

    return (
            <div className="text-2xl">
                <h2 className="text-green-300 text-4xl mb-8 text-center ">Create Member</h2>
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
                                value={formData.FirstName}
                                onChange={(e) => handleInputChange(e, "FirstName")}
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
                                value={formData.LastName}
                                onChange={(e) => handleInputChange(e, "LastName")}
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
                                value={formData.UserName}
                                onChange={(e) => handleInputChange(e, "UserName")}
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

                        {/* PhoneNumber */}
                        <div>
                            <label className="block text-green-300 mb-2">Phone Number</label>
                            <input
                                id="PhoneNumber"
                                name="PhoneNumber"
                                type="text"
                                required
                                autoComplete="PhoneNumber"
                                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                                placeholder="Enter Phone Number"
                                value={formData.PhoneNumber}
                                onChange={(e) => handleInputChange(e, "PhoneNumber")}
                            />
                        </div>
                        {/* Age */}
                        <div>
                            <label className="block text-green-300 mb-2">Age</label>
                            <input
                                id="Age"
                                name="Age"
                                type="text"
                                required
                                autoComplete="Age"
                                value={formData.Age}
                                onChange={(e) => handleInputChange(e, "Age")}
                                className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none"
                                placeholder="Enter your age"
                            />
                        </div>

                    </div>    
                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="submit"
                            className="bg-hover text-black py-2 px-6 rounded-lg focus:outline-none hover:!bg-green"
                        >
                            Sign up!
                        </button>
                    </div>
                </form>
             </div>
       
    );
};

export default CreateForm;