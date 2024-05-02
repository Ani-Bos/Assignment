import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [uni, setUni] = useState("")
  useEffect(() => {
    const getUsers = async () => {
      try {
        const url = "https://dummyjson.com/users";
        const resp = await axios.get(url);
        const { data } = resp;
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);
     
     const handleCheckboxChange = (event, user) => {
       const isChecked = event.target.checked;
       if (isChecked) {
         setSelectedContacts((prevSelectedContacts) => [
           ...prevSelectedContacts,
           user,
         ]);
       } else {
         setSelectedContacts((prevSelectedContacts) =>
           prevSelectedContacts.filter((contact) => contact.id !== user.id)
         );
       }
  };


    //  console.log("Selected contacts are: ", JSON.stringify(selectedContacts));
  const handleDownload = async () => {
    const uni = uuidv4()
    setUni(uni)
    const formData = {
          uniquetoken:uni,
          name: selectedContacts.map((contact) => 
            `${contact.firstName} ${contact.lastName}`,
          ),
          email: selectedContacts.map((contact) => contact.email),
          age: selectedContacts.map((contact) => contact.age),
          phoneNumber: selectedContacts.map((contact) => contact.phone),
       };
       console.log(formData)
       try{
         const url = "https://assignment-bizp.onrender.com/api";
         const res = await axios.post(`${url}/download`, formData);
         // console.log("formData is " + JSON.stringify(formData));
         console.log(res.data);
         const downloadRes = await axios.get(`${url}/csvfile/${uni}`);
         console.log(downloadRes.data)
         const blob = new Blob([downloadRes.data]);
         const csvUrl = window.URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = csvUrl;
         link.setAttribute("download", "usersData.csv");
         document.body.appendChild(link);
         link.click();
         window.URL.revokeObjectURL(csvUrl);
         document.body.removeChild(link);
         console.log("Data saved and CSV file downloaded successfully");
       }
       catch (error) {
         console.error("Error sending data:", error);
       }
     };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="bg-[#F7F7F7]">
      <div className="flex justify-center items-center">
        <button
          className="inline-block rounded-md mt-3 px-6 mb-3 py-1.5 text-base border border-gray-300 shadow-md leading-7 text-black hover:bg-green-500 hover:text-white drop-shadow-sm"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-3/4 m-auto text-sm text-left shadow-md rounded-md">
          <thead className="text-xs text-gray-700 bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-200 rounded focus:ring-blue-500 dark:bg-gray-700"
                  onChange={() => {}}
                ></input>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
              >
                <td className="px-6 py-4">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-200 rounded focus:ring-blue-500 dark:bg-gray-700"
                    onChange={(event) => handleCheckboxChange(event, user)}
                  ></input>
                </td>
                <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-black whitespace-nowrap">
                  {user.phone}
                </td>
                <td className="px-6 py-4 text-black whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-black whitespace-nowrap">
                  {user.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex mt-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-100"
          >
            {"<"}
          </button>
          <p className="m-auto">
            {indexOfFirstUser + 1}-{indexOfLastUser} of {users.length}
          </p>
          <button
            onClick={nextPage}
            disabled={currentUsers.length < usersPerPage}
            className="mx-1 px-3 py-1 border border-gray-300 bg-white rounded-md hover:bg-gray-100"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
