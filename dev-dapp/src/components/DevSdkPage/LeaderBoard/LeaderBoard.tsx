//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../hooks/useReduxHooks";
import { defaultAvatar } from "../../../images/index";
import { rFetch } from "../../../utils/rFetch";
import { rairSDK } from "../../common/rairSDK";

const LeaderBoard = () => {
  const [userList, setUserList] = useState<any>();
  const { currentUserAddress } = useAppSelector((store) => store.web3);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    const { data } = await rairSDK.users.listUsers();
    if (data) {
      setUserList(data);
    }
  }, []);

  const navigateToProfilePage = (userAddress) => {
    navigate(`/${userAddress}`);
  };

  useEffect(() => {
    getUserData();
  }, [getUserData, currentUserAddress]);

  return (
    <div className="table-container-leader">
      <table>
        <thead>
          <tr>
            <th>Git Handle</th>
            <th>Level</th>
            <th className="availability-leader">Availability</th>
            <th className="language-leader">Top Language</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((el, index) => {
              return (
                <tr key={index}>
                  <td
                    onClick={() => navigateToProfilePage(el.publicAddress)}
                    className="git-handle"
                  >
                    <img src={defaultAvatar} alt="Avatar" className="avatar" />{" "}
                    {el.nickName && el.nickName.length > 12
                      ? `${el.nickName?.slice(
                          0,
                          9
                        )}...${el.nickName?.slice(length - 5)}`
                      : el.nickName}
                  </td>
                  <td>104</td>
                  <td className="availability-number">Open</td>
                  <td className="language-text">
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
