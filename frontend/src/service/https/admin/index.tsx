import { AdminsInterface } from "../../../interface/IAdmin";

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

async function GetAdmins() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    return await fetchData(`${apiUrl}/admins`, requestOptions);
}

async function GetAdminById(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "GET",
    };

    return await fetchData(`${apiUrl}/admin/${id}`, requestOptions);
}

async function CreateAdmin(data: AdminsInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return await fetchData(`${apiUrl}/CreateAdmin`, requestOptions);
}

async function UpdateAdminById(id: number | undefined, data: AdminsInterface) {
    // สร้างออบเจ็กต์ใหม่ที่มีเฉพาะข้อมูลที่ต้องการอัปเดต
    const updateData = {
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Email: data.Email,
        Username: data.Username,
        GenderID: data.GenderID,
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
        const response = await fetch(`${apiUrl}/UpdateAdmin/${id}`, requestOptions);
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


async function DeleteAdminByID(id: number | undefined) {
    if (id === undefined) return false;

    const requestOptions = {
        method: "DELETE",
    };

    return await fetchData(`${apiUrl}/admins/${id}`, requestOptions);
}

export { GetAdmins, GetAdminById, CreateAdmin, UpdateAdminById, DeleteAdminByID };
