// const [jsonData, setJsonData] = useState([]);

// function fetchJSON() {
//   //simply grab all data
//   fetch(`http://localhost:3004/rooms`).then((r) => {
//     if (r.status !== 200) {
//       console.log(`${r.status} : Error has occured.`);
//       return;
//     }
//     r.json().then((data) => {
//       setJsonData(data);
//     });
//   });
// }

// function postData() {
//   const roomData = {
//     userID: socket.id,
//     redditRoom: redditRoom,
//     manualRoom: room,
//   };

//   //post room id as it's created, if already created count++
//   fetch("http://localhost:3004/rooms", {
//     method: "POST", // or 'PUT'
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(roomData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
// function deleteData(id) {
//   //need to grab the id of each room, probably do it for whether it's a reddit chat or manual chat
//   fetch(`http://localhost:3004/rooms/2`, {
//     method: "DELETE",
//   }).catch((error) => {
//     console.error("Error:", error);
//   });
// }

// console.log(jsonData);

useEffect(() => {
  const establishConnection = () => {
    const socket = io.connect("http://localhost:5050/");
    return socket;
  };
  setSocket(establishConnection());

  const deleteData = async () => {
    const data = await fetchJSON();
    console.log(data);

    const removal = data.find((user) => {
      return user.author === userName
        ? deleteFetch(user.id)
        : console.log("no user");
    });

    return removal;
  };

  return () => {
    socket.on("disconnect", deleteData());
  };
}, [socket, userName]);

window.addEventListener("beforeunload", (event) => {
  if (userName.length > 0) {
    event.returnValue = "NOOOOOOOOO!";
    deleteData();
  }
});
