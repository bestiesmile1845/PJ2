import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaRegSave } from "react-icons/fa";
import { UpdateEquipment, GetEquipmentById } from "../../../../service/https/equipment";
import toast, { Toaster } from "react-hot-toast";
import { EquipmentsInterface } from "../../../../interface/IEquipment";
import imageCompression from "browser-image-compression";
import SideBar from "../../../../components/admin/equipment/SideBar";
import Navbar from "../../../../components/admin/equipment/Navbar";
import Dropzone from "../../../../components/admin/equipment/Dropzone";
import Form from "../../../../components/admin/equipment/EditClass/Form";
import Modal from "../../../../components/admin/equipment/CreateClass/Modal";

const EditEquipment: React.FC = () => {
    const { equipmentID } = useParams<{ equipmentID: string }>();
    const navigate = useNavigate();
    const [equipmentName, setEquipmentName] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [equipmentDescription, setEquipmentDescription] = useState<string>("");
    const [equipmentPic, setEquipmentPic] = useState<File | null>(null);
    const [equipmentPicURL, setEquipmentPicURL] = useState<string>("");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    const fetchEquipmentDetails = useCallback(async () => {
        try {
            if (!equipmentID) return;
            const res = await GetEquipmentById(Number(equipmentID));
            if (res) {
                setEquipmentName(res.EquipmentName || "");
                setStartDate(res.StartDate ? new Date(res.StartDate) : null);
                setReturnDate(res.ReturnDate ? new Date(res.RndDate) : null);
                setEquipmentDescription(res.Deets || "");
                setEquipmentPicURL(res.EquipmentPic || "");
            }
        } catch (error) {
            console.error("Failed to fetch equipment details", error);
        }
    }, [equipmentID]);

    const handleSave = async () => {
        setConfirmLoading(true);

        const delayedUpdateEquipment = new Promise<boolean>((resolve, reject) => {
            const updateEquipmentAsync = async () => {
                try {
                    const adminID = localStorage.getItem("id");
                    const adminIDNumber = adminID ? Number(adminID) : 1;
                    const updatedEquipment: EquipmentsInterface = {
                        ID: Number(equipmentID),
                        EquipmentName: equipmentName,
                        Deets: equipmentDescription,
                        EquipmentPic: equipmentPic ? await getBase64(equipmentPic) : equipmentPicURL,
                        StartDate: startDate ? new Date(startDate) : undefined,
                        EndDate: returnDate ? new Date(returnDate) : undefined,
                        AdminID: adminIDNumber,
                    };

                    const res = await UpdateEquipment(updatedEquipment);
                    if (res) {
                        resolve(true);
                    } else {
                        reject(new Error("Failed to update equipment."));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            updateEquipmentAsync();
        });

        toast.promise(delayedUpdateEquipment, {
            loading: "Updating equipment...",
            success: "Equipment updated successfully!",
            error: "Failed to update equipment.",
        });

        try {
            await delayedUpdateEquipment;
            navigate("/equip");
        } catch (error) {
            console.error("Error updating equipment:", error);
        } finally {
            setConfirmLoading(false);
            setModalVisible(false);
        }
    };

    const showConfirmModal = () => setModalVisible(true);
    const handleCancel = () => setModalVisible(false);

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const options = {
                maxSizeMB: 0.9,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                setEquipmentPic(compressedFile);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setEquipmentPicURL(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing file:", error);
            }
        }
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        fetchEquipmentDetails();
    }, [fetchEquipmentDetails]);

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Equipment" />
                <div className="navbar bg-black h-[76px] flex items-center">
                    <h1 className="text-3xl text-secondary ml-14 mt-5">EDIT EQUIPMENT</h1>
                    <button
                        className={`text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-hover ml-auto mr-14 shadow-md hover:shadow-lg ${
                            confirmLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={showConfirmModal}
                        disabled={confirmLoading}
                    >
                        <FaRegSave className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                        <span>Save</span>
                    </button>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray4 mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex">
                            <Dropzone onDrop={handleDrop} equipmentPicURL={equipmentPicURL} />
                            <Form
                                equipmentName={equipmentName}
                                setEquipmentName={setEquipmentName}
                                equipmentDescription={equipmentDescription}
                                setEquipmentDescription={setEquipmentDescription}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                returnDate={returnDate}
                                setReturnDate={setReturnDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Confirm Save" visible={modalVisible} onOk={handleSave} onCancel={handleCancel} confirmLoading={confirmLoading}>
                <p>Are you sure you want to update this equipment?</p>
            </Modal>
            <Toaster />
        </div>
    );
};

export default EditEquipment;
