import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../../api/user.api';
import "./Users.scss";

const Users = () => {
    const [users, setUser] = useState(null);
    useEffect(() => {
        getAllUser()
            .then((data) => {
                setUser(data.users)
            })
    }, []);
    
    return (
        <div className='admin-user-container'>
            <h3>Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isVerified ? "Verified" : "Not verified"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Users;