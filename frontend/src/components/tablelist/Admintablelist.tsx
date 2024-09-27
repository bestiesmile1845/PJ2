import React, { useState, useEffect } from "react";
import { GetAdmins } from "../../service/https/admin/index";
import { AdminsInterface } from "../../interface/IAdmin";
import { Link } from 'react-router-dom';

const TableList: React.FC = () => {
  const [Admins, setAdmins] = useState<AdminsInterface[]>([]); // Initialize an empty array for admins

  // Fetch admin data on component mount
  useEffect(() => {
    const getAdmins = async () => {
      let res = await GetAdmins(); // Assuming GetAdmins is an API call
      console.log(res);
      if (res) {
        setAdmins(res);
      }
    };
    getAdmins();
  }, []);

  const handlegoto = (id: number | undefined) => {
    localStorage.setItem('AdminID', String(id));
    console.log(id);
    console.log(`Editing data with id: ${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-[1600px] text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-green dark:text-black">
          <tr>
            <th scope="col" className="px-6 py-3">First name</th>
            <th scope="col" className="px-6 py-3">Last name</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {Admins.length > 0 ? (
            Admins.map((admin, index) => (
              <tr
                key={admin.ID || index}
                className="odd:bg-white odd:dark:bg-createBTN even:bg-gray-50 even:dark:bg-sidebar border-b dark:border-white"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {admin.Firstname}
                </th>
                <td className="px-6 py-3">{admin.Lastname}</td>
                <td className="px-6 py-3">{admin.Username}</td>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3">
                  <Link to="/EditAdmin" onClick={() => handlegoto(admin.ID)}>
                    <a
                      href="#"
                      // onClick={(event) => handlegoto(event, admin.ID)}
                      className="font-medium text-green dark:text-green hover:underline"
                    >
                      Edit
                    </a>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center px-6 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
