import { useState, useEffect, } from "react";
import { useAuth } from "../Authentication/components/firebase/firebase";
import { Link } from 'react-router-dom';
import Lodder from "../Lodding/LodderFile";
function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:8000/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <Lodder />; // Display a loading message or spinner
  }

  if (error) {
    return <p>Error: {error}</p>; // Display an error message
  }

  return (
    <div className="w-[100%]">
      {users
        .filter(userItem => userItem.email_address.trim().toLowerCase() === currentUser.email.trim().toLowerCase())
        .map((userItem, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg border w-[100%] ">
            <div className=" flex  absolute "><Link className="mr-5 mt-5 ml-[350px] font-bold px-3 py-1 rounded-lg  cursor-pointer bg-black text-white" to="/user/edit" >edit</Link></div>

            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {userItem.full_name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {userItem.phone_number}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <div className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userItem.email_address}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    College Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userItem.college_name}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    College Status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userItem.college_status}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {[
                      userItem.address_area,
                      userItem.address_city,
                      userItem.address_state,
                      userItem.postCode
                    ]
                      .filter(Boolean) // Remove empty values
                      .join(', ')}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserInfo;
