import { MembersInterface } from "../../../interface/IMembers";

const apiUrl = "http://localhost:8000";

// Helper function for handling fetch requests
const fetchData = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.status === 204 ? true : await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
};

async function GetGenders() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/genders`, requestOptions);
}

async function GetMembers() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/members`, requestOptions);
}

async function GetMemberById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/member/${id}`, requestOptions);
}

async function CreateMember(data: MembersInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/members`, requestOptions);
}

async function UpdateMember(id: number | undefined, data: MembersInterface) {
    // สร้างออบเจ็กต์ใหม่ที่มีเฉพาะข้อมูลที่ต้องการอัปเดต
    const updateData = {
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Email: data.Email,
        Username: data.Username,
        Phonenumber: data.Phonenumber || "", // Assuming this field exists in data
        GenderID: data.GenderID,
        Password: "", // Keep Password empty for security reasons
        Age: data.Age || "", // Assuming this field exists in data
        TypeMember: data.TypeMember || "", // Assuming this field exists in data
        PaymentStatus: data.PaymentStatus || "", // Assuming this field exists in data
        SuspensionStatus: data.SuspensionStatus || "", // Assuming this field exists in data
        // Password is usually not included in updates for security reasons
    };
  
    const requestOptions = {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // ส่งเฉพาะข้อมูลที่ต้องการอัปเดต
    };
  
    try {
        const response = await fetch(`${apiUrl}/UpdateMember/${id}`, requestOptions);
        const res = await response.json();
  
        if (res.data) {
            return { status: true, message: res.data };
        } else {
            return { status: false, message: res.error };
        }
    } catch (error: any) {
        return { status: false, message: error.message };
    }
}


async function DeleteMemberByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/members/${id}`, requestOptions);
}


export { GetGenders, GetMembers, GetMemberById, CreateMember, UpdateMember, DeleteMemberByID };