import React from 'react';
import person from "../../assets/person-circle.svg";
import "./ProfileIcon.scss";


const ProfileIcon = () => {
    return (
        <div className="profile-picture">
            <img src={person} alt="Default user profile" />
        </div>
    )
}

export default ProfileIcon;