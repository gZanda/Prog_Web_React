const MANAGER = "Manager";
const WORKER = "Worker";

const UserType = {
    isManager: () => {
        return localStorage.getItem("Role") === MANAGER;
    },

    isWorker: () => {
        return localStorage.getItem("Role") === WORKER;
    }
};

export default UserType;