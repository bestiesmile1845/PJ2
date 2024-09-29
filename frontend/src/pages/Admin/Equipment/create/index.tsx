import React, { useState } from 'react';
import SideBar from "../../../../components/admin/equipment/SideBar";
import Navbar from "../../../../components/admin/equipment/Navbar";
import Dropzone from '../../../../components/admin/equipment/Dropzone';
import EquipmentForm from '../../../../components/admin/equipment/CreateClass/EquipmentForm';
import ConfirmModal from '../../../../components/admin/equipment/CreateClass/ConfirmModal';
import { FaRegSave } from 'react-icons/fa';
import { CreateEquipment } from '../../../../service/https/equipment';
import { EquipmentsInterface } from '../../../../interface/IEquipment';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import toast, { Toaster } from 'react-hot-toast';

const EquipmentCreate: React.FC = () => {
    const [equipmentName, setEquipmentName] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [equipmentDescription, setEquipmentDescription] = useState<string>('');
    const [equipmentPic, setEquipmentPic] = useState<File | null>(null);
    const [equipmentPicURL, setEquipmentPicURL] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        setConfirmLoading(true);
        const errors: string[] = [];

        if (!equipmentName) errors.push("Please enter the equipment name.");
        if (!equipmentPic) errors.push("Please upload an equipment picture.");
        if (!equipmentDescription) errors.push("Please enter a description.");
        if (!startDate) errors.push("Please select a start date.");
        if (!endDate) errors.push("Please select an end date.");

        if (startDate && endDate) {
            const startDay = startDate.getDate();
            const startMonth = startDate.getMonth();
            const startYear = startDate.getFullYear();

            const endDay = endDate.getDate();
            const endMonth = endDate.getMonth();
            const endYear = endDate.getFullYear();

            if (startDay !== endDay || startMonth !== endMonth || startYear !== endYear) {
                errors.push("Start date and end date must be on the same day.");
            } else {
                const startTime = startDate.getTime();
                const endTime = endDate.getTime();

                if (startTime >= endTime) {
                    errors.push("Start time must be earlier than end time.");
                }
            }
        }

        if (errors.length > 0) {
            errors.forEach((error, index) => {
                setTimeout(() => {
                    toast.error(error);
                }, index * 1000);
            });
            setConfirmLoading(false);
            return;
        }

        try {
            const adminID = localStorage.getItem("id");
            const adminIDNumber = adminID ? Number(adminID) : 1;
            const newEquipment: EquipmentsInterface = {
                EquipmentName: equipmentName,
                Deets: equipmentDescription,
                EquipmentPic: equipmentPic ? await getBase64(equipmentPic) : equipmentPicURL,
                StartDate: startDate ? new Date(startDate) : undefined,
                EndDate: endDate ? new Date(endDate) : undefined,
                AdminID: adminIDNumber,
            };

            console.log("Creating equipment with data:", newEquipment);

            const res = await CreateEquipment(newEquipment);
            if (res) {
                setTimeout(() => {
                    toast.success("Equipment created successfully!");
                }, 1000);
                navigate("/equipment");
            } else {
                toast.error("Failed to create equipment.");
            }
        } catch (error) {
            console.error("Error creating equipment:", error);
            toast.error("Failed to create equipment.");
        } finally {
            setConfirmLoading(false);
            setModalVisible(false);
        }
    };

    const showConfirmModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

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
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-black w-full">
                <Navbar title="Equipment" />
                <div>
                    <div className="navbar bg-black h-[76px] flex items-center">
                        <h1 className="text-3xl text-green1 ml-14 mt-2">CREATE EQUIPMENT</h1>
                        <button
                            className="text-white font-sans font-medium text-m px-5 py-3 flex items-center bg-gray3 rounded-full hover:bg-green5 ml-auto mr-14 shadow-md hover:shadow-lg"
                            onClick={showConfirmModal}
                        >
                            <FaRegSave className="w-[24px] h-auto cursor-pointer text-green1 mr-2" />
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray4 mt-5 w-[1000px] h-[480px] rounded-3xl overflow-auto scrollable-div flex justify-center">
                        <div className="flex flex-row items-start m-8">
                            <Dropzone onDrop={handleDrop} equipmentPicURL={equipmentPicURL} />
                            <EquipmentForm
                                equipmentName={equipmentName}
                                setEquipmentName={setEquipmentName}
                                equipmentDescription={equipmentDescription}
                                setEquipmentDescription={setEquipmentDescription}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal visible={modalVisible} onOk={handleSave} onCancel={handleCancel} confirmLoading={confirmLoading} />
            <Toaster />
        </div>
    );
};

export default EquipmentCreate;