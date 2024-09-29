import React, { useState, useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { GetEquipment , DeleteEquipmentByID } from "../../../service/https/equipment";
import SideBar from "../../../components/admin/class/SideBar";
import Navbar from "../../../components/admin/class/Navbar";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Equipment {
    ID: number;
    EquipmentName: string;
    EquipmentPic: string;
    EquipmentDescription: string;
    StartDate: string;
    EndDate: string;
}

const Equipment: React.FC = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equipmentToDelete, setEquipmentToDelete] = useState<number | null>(null);
    const [equipmentNameToDelete, setEquipmentNameToDelete] = useState<string>("");

    const navigate = useNavigate();

    const fetchEquipments = async () => {
        try {
            const res = await GetEquipment(); // Assuming this function fetches equipment
            if (res) {
                setEquipments(res);
            }
        } catch (error) {
            console.error("Failed to fetch equipments", error);
        }
    };

    const handleEditClick = (id: number) => {
        navigate(`/equip/edit/${id}`);
    };

    const handleDeleteClick = (id: number, equipmentName: string) => {
        setEquipmentToDelete(id);
        setEquipmentNameToDelete(equipmentName);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (equipmentToDelete !== null) {
            const deleteEquipmentPromise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await DeleteEquipmentByID(equipmentToDelete); // Assuming this function deletes equipment
                        resolve("Equipment deleted");
                        setEquipments(equipments.filter((equip) => equip.ID !== equipmentToDelete));
                    } catch (error) {
                        reject(error);
                    }
                }, 1000);
            });

            toast.promise(deleteEquipmentPromise, {
                loading: "Deleting...",
                success: <b>Equipment "{equipmentNameToDelete}" has been deleted successfully.</b>,
                error: <b>Failed to delete equipment.</b>,
            });
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchEquipments();
    }, []);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full h-screen">
                <Navbar title="Equipment" />
                <div className="navbar bg-black h-[76px] flex items-center">
                    <div className="ml-auto mr-14">
                        <Link to="/equip/create">
                            <button className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 shadow-md hover:shadow-lg">
                                <GrAddCircle className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                                <span>Create Equipment</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="text-white bg-black overflow-auto h-[520px] scrollable-div">
                    <div className="flex flex-wrap justify-center">
                        {equipments.map((equipment) => {
                            const base64String = equipment.EquipmentPic || "";
                            const imageSrc = base64String.startsWith("data:image/")
                                ? base64String
                                : `data:image/jpeg;base64,${base64String}`;

                            return (
                                <div
                                    key={equipment.ID}
                                    className="bg-gray4 ml-14 w-[500px] h-[510px] rounded-3xl relative mb-7 mr-7 overflow-auto scrollable-div"
                                >
                                    <div className="flex ml-6 pt-6 h-auto">
                                        <div className="flex flex-col items-start relative">
                                            <img
                                                src={imageSrc}
                                                alt={equipment.EquipmentName}
                                                className="w-[454px] h-[280px] rounded-3xl object-cover"
                                            />
                                            <div className="absolute top-0 left-0 p-4">
                                                <h2 className="text-green3 mb-2 text-[38px]">{equipment.EquipmentName}</h2>
                                            </div>
                                            <h3 className="text-green1 mt-2 mb-2 mr-6 text-[20px]">{equipment.EquipmentDescription}</h3>
                                            <h4 className="text-green1 mb-2 text-[20px]">
                                                Start: {dayjs.tz(equipment.StartDate, "Asia/Bangkok").format("D MMM YYYY")} <br />
                                                End: {dayjs.tz(equipment.EndDate, "Asia/Bangkok").format("D MMM YYYY")}
                                            </h4>
                                        </div>
                                    </div>
                                    <button
                                        className="absolute top-8 right-20 bg-gray2 py-2 px-2 rounded-xl hover:bg-green5"
                                        onClick={() => handleEditClick(equipment.ID)}
                                    >
                                        <MdEdit className="w-[24px] h-auto cursor-pointer text-black hover:text-white" />
                                    </button>
                                    <button
                                        className="absolute top-8 right-8 bg-gray2 py-2 px-2 rounded-xl hover:bg-rose-600"
                                        onClick={() => handleDeleteClick(equipment.ID, equipment.EquipmentName)}
                                    >
                                        <MdDeleteForever className="w-[24px] h-auto cursor-pointer text-black hover:text-white" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray4 p-6 rounded-lg shadow-lg text-white border border-green3">
                        <h2 className="text-lg">Confirm Deletion</h2>
                        <p className="mt-2">Are you sure you want to delete the equipment "{equipmentNameToDelete}"?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="bg-rose-500 text-white px-4 py-2 rounded-md mr-2" onClick={confirmDelete}>
                                Delete
                            </button>
                            <button className="bg-gray2 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default Equipment;
