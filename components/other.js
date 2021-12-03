export function getStack(){
  return[
    "React",
    "React",
    "React",
    "React",
    "React",
    "React",
    "React",
    "React",
    "React",
    "React",
  ]
}

export function getTags(){
  return [
    {name: "AgriTech", checked: false},
    {name: "AI/ML", checked: false},
    {name: "ArtTech", checked: false},
    {name: "BigData", checked: false},
    {name: "BioTech", checked: false},
    {name: "Blockchain", checked: false},
    {name: "ConstructionTech", checked: false},
    {name: "CyberSecurity", checked: false},
    {name: "FinTech", checked: false},
    {name: "FoodTech", checked: false},
    {name: "Gaming", checked: false},
    {name: "EdTech", checked: false},
    {name: "Energy", checked: false},
    {name: "Engineering", checked: false},
    {name: "Marketplace", checked: false},
    {name: "TravelTech", checked: false},
    {name: "MiningTech", checked: false},
    {name: "Utilities", checked: false},
    {name: "New Media and Entertainment", checked: false},
    {name: "VR/AR/MR", checked: false},
    {name: "HealthTech", checked: false},
    {name: "NuclTech", checked: false},
    {name: "B2B", checked: false},
    {name: "HR", checked: false},
    {name: "PR/MarTech", checked: false},
    {name: "B2B2C", checked: false},
    {name: "Impact & Eco", checked: false},
    {name: "RealEstate", checked: false},
    {name: "B2C", checked: false},
    {name: "Industrial Design", checked: false},
    {name: "Retail & E-commerce", checked: false},
    {name: "B2G", checked: false},
    {name: "IndustrialTech", checked: false},
    {name: "Robotics", checked: false},
    {name: "C2C", checked: false},
    {name: "IT", checked: false},
    {name: "Sharing", checked: false},
    {name: "G2B", checked: false},
    {name: "LegalTech", checked: false},
    {name: "Sports", checked: false},
    {name: "Logistics", checked: false},
    {name: "Telecom", checked: false},

  ]
}


export function parseJwt () {
  let buff={
    id:localStorage.getItem("id"),
    sub:localStorage.getItem("roles")
  }
  return buff


  try{
    var base64Url = localStorage.getItem("accessToken").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let buff=JSON.parse(jsonPayload)
    return buff;
  }catch (e){
    return null
  }
};

export function query(url,method,body,onLoad,onError){
  fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: method,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken"),
      "Content-type":"application/json"
    },
    body:JSON.stringify(body)
  }).then(r =>[r.json(),r.status])
    .then((result)=>{
      if(result[1]===200)
        result[0].then((e)=>{
          onLoad(e)
        })
      else
        onError()
    })
}

export function query2(url,method,body,onLoad,onError){
  fetch("http://10.11.162.172:3001" + url, {
    method: method,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken"),
      "Content-type":"application/json"
    },
    body:JSON.stringify(body)
  }).then(r =>[r.json(),r.status])
    .then((result)=>{
      if(result[1]===200)
        result[0].then((e)=>{
          onLoad(e)
        })
      else
        if(onError)
          onError()
    })
}
