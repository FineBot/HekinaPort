export default function getMenuTabs(userRole){
  let tabs=[]
  if (userRole === "admin") {
    tabs = [
      {
        title: "Профиль", pathname: "/profile", onClick: () => {
          window.location.pathname = "/profile"
        }
      },

      {
        title: "Пользователи", pathname: "/users", onClick: () => {
          window.location.pathname = "/users"
        }
      },
      {
        title: "Команды", pathname: "/teams", onClick: () => {
          window.location.pathname = "/teams"
        }
      },
      {
        title: "Проекты", pathname: "/projects", onClick: () => {
          window.location.pathname = "/projects"
        }
      },
      {
        title: "Задачи", pathname: "/tasks", onClick: () => {
          window.location.pathname = "/tasks"
        }
      },
    ]
  } else if (userRole === "worker") {
    tabs = [
      {
        title: "Профиль", pathname: "/profile", onClick: () => {
          window.location.pathname = "/profile"
        }
      },
      {
        title: "Проекты", pathname: "/projects", onClick: () => {
          window.location.pathname = "/projects"
        }
      },
    ]
  } else {
    tabs = [
      {
        title: "Профиль", pathname: "/profile", onClick: () => {
          window.location.pathname = "/profile"
        }
      },
      {
        title: "Задачи", pathname: "/tasks", onClick: () => {
          window.location.pathname = "/tasks"
        }
      },
    ]
  }
  return tabs
}
