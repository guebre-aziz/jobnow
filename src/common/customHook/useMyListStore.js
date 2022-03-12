import { useState, useEffect } from "react";

export default function useMyListStore() {
  const [myListData, setMyListData] = useState([]);
  let ls = localStorage.getItem("jobnow-my-list");

  // initialize
  useEffect(() => {
    if (ls) {
      let dataObj = JSON.parse(ls);
      if (dataObj.length) {
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
    if (myListData) {
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
    myListData,
    isJobOnMyList,
    addJobToMylist,
    removeJobFromMyList,
  };
}
