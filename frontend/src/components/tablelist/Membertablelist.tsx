import React, { useState, useEffect } from "react";
import { GetMembers } from "../../service/https/member";
import {MembersInterface }from "../../interface/IMembers";
import { Link } from 'react-router-dom';
const TableList: React.FC = () => {
  const [members, setMembers] = useState<MembersInterface[]>([]); // Initialize an empty array for users

  // Fetch users data on component mount
  useEffect(() => {
    const getMembers = async () => {
      let res = await GetMembers(); // Assuming GetUsers is an API call
      if (res) {
        setMembers(res);
      }
    };
    getMembers();
  }, []);
  const handlegoto = (id: number | undefined) => {
    localStorage.setItem('MemberID', String(id));
    console.log(id);
    console.log(`Editing data with id: ${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-[1600px] text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-green dark:text-black">
          <tr>
            <th scope="col" className="px-6 py-3">First name</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">TypeMember</th>
            <th scope="col" className="px-6 py-3">SuspensionStatus</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((members, index) => (
              <tr
                key={members.ID || index}
                className="odd:bg-white odd:dark:bg-createBTN even:bg-gray-50 even:dark:bg-sidebar border-b dark:border-white"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {members.Firstname}
                </th>
                <td className="px-6 py-4">{members.Username}</td>
                <td className="px-6 py-4">{members.TypeMember}</td>
                <td className="px-6 py-4">{members.SuspensionStatus}</td>
                <td className="px-6 py-4">
                    <Link to="/EditMember" onClick={() => handlegoto(members.ID)}><a href="#" className="font-medium text-green dark:text-green hover:underline">Edit</a></Link>
                  
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
