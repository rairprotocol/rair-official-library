//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import { defaultAvatar } from "../../../images/index";
import { rFetch } from "../../../utils/rFetch";
import { rairSDK } from "../../common/rairSDK";

const LeaderBoard = () => {
  const [userList, setUserList] = useState<any>();
  const { currentUserAddress } = useAppSelector((store) => store.web3);

  const getUserData = useCallback(async () => {
    const { data } = await rairSDK.users.listUsers();
    if (data) {
      setUserList(data);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData, currentUserAddress]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Git Handle</th>
            <th>Level</th>
            <th>Availability</th>
            <th>Top Language</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((el) => {
              return (
                <tr key={el._id}>
                  <td className="git-handle">
                    <img src={defaultAvatar} alt="Avatar" className="avatar" />{" "}
                    {el.nickName}
                  </td>
                  <td>104</td>
                  <td>Open</td>
                  <td>
                    <span className="icon"></span> Solidity
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
