import React, { Component, useEffect, useState } from "react";


export default class UserDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      userData: ""
    };
   
  }
  

  componentDidMount()  {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('ulla')
        console.log(data, "userData") ;
        this.setState({userData: data.data});
      });}

  render() {
    return (
        <div>
            Name<h1>{this.state.userData.fname}</h1>
            mail<h1>{this.state.userData.email}</h1>
        </div>
    )
  }
}

// import React, { Component, useEffect, useState } from "react";


// export default function UserDetails() {
//   const [userData, setUserData] = useState("");
//   // const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/userData", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         token: window.localStorage.getItem("token"),
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "userData");
//         if (data.data.userType == "Admin") {
//           setAdmin(true);
//         }

//         setUserData(data.data);

//         if (data.data == "token expired") {
//           alert("Token expired login again");
//           window.localStorage.clear();
//           window.location.href = "./sign-in";
//         }
//       });
//   }, []);

//   return admin ? <AdminHome /> : <UserHome userData={userData} />;
// }