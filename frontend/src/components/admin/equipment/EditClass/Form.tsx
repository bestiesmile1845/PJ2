// components/EquipmentForm.tsx
import React from "react";
import Label from "../Label";
import Input from "../Input";
import Textarea from "../Textarea";
import DateTimePicker from "../DateTimePicker";

interface FormProps {
    equipmentName: string;
    setEquipmentName: (value: string) => void;
    equipmentDescription: string;
    setEquipmentDescription: (value: string) => void;
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    returnDate: Date | null;
    setReturnDate: (date: Date | null) => void;
}

const Form: React.FC<FormProps> = ({
    equipmentName,
    setEquipmentName,
    equipmentDescription,
    setEquipmentDescription,
    startDate,
    setStartDate,
    returnDate,
    setReturnDate,
}) => {
    return (
        <div className="flex-1 pt-7">
            <div className="flex flex-col items-start ml-[40px]">
                <Label text="Equipment Name" />
                <Input
                    placeholder="Enter Equipment Name here"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                />
                <Label text="Equipment Description" />
                <Textarea
                    placeholder="Write Equipment Description here"
                    value={equipmentDescription}
                    onChange={(e) => setEquipmentDescription(e.target.value)}
                />
                <DateTimePicker
                    selectedDate={startDate || new Date()}
                    onChange={(date) => setStartDate(date)}
                    label="Start Date and Time:"
                />
                <DateTimePicker
                    selectedDate={returnDate || new Date()}
                    onChange={(date) => setReturnDate(date)}
                    label="Return Date and Time:"
                />
            </div>
        </div>
    );
};

export default Form;
