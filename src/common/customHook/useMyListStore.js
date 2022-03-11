import { useState, useEffect } from "react";

export default function useMyListStore() {
  const [isData, setIsData] = useState(null);
  const [myListData, setMyListData] = useState([]);
  let data = localStorage.getItem("jobnow-my-list");

  useEffect(() => {
    if (data) {
      let dataObj = JSON.parse(data);
      if (dataObj.length) {
        setIsData(true);
        setMyListData(dataObj);
      } else {
        localStorage.setItem("jobnow-my-list", JSON.stringify([]));
        setMyListData([]);
      }
    } else {
      localStorage.setItem("jobnow-my-list", JSON.stringify([]));
      setMyListData([]);
    }
  }, []);

  function isJobOnMyList(id) {
    if (isData) {
      if (myListData.map((item) => item.id).indexOf(id) >= 0) {
        return true;
      } else return false;
    } else return false;
  }

  function addJobToMylist(job) {
    let data = myListData;
    data.unshift(job);
    let set = [...new Set(data)];
    setMyListData(set);
    setMylistLocalStorage(set);
  }

  function removeJobFromMyList(id) {
    let newData;
    if (myListData) {
      newData = myListData.filter((job) => job.id !== id);
      setMyListData(newData);
      setMylistLocalStorage(newData);
    }
  }

  useEffect(() => {}, [myListData]);

  function setMylistLocalStorage(data) {
    if (!data) {
      localStorage.setItem("jobnow-my-list", "");
    }
    localStorage.setItem("jobnow-my-list", JSON.stringify(data));
  }

  return {
    isData,
    myListData,
    isJobOnMyList,
    addJobToMylist,
    removeJobFromMyList,
  };
}
