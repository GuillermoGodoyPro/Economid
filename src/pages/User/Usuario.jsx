import { Link } from "react-router-dom";

const Usuario = () => {
    return (
        <div>
            <form>
                <div>
                    <label>ID</label>
                    <input type="number" placeholder="Student ID to Edit" id="idInput" />
                </div>
                <div>
                    <label>First Name</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" id="lastNameInput" />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" name="address" id="address" />
                </div>
                <div>
                    <label>Grade</label>
                    <input type="number" id="grade" name="grade" />
                </div>
                <div>
                    <label>DNI</label>
                    <input type="number" id="DNI" name="dni" />
                </div>
                <div>
                    <label>Born Date</label>
                    <input type="date" id="bornDate" name="bornDate" />
                </div>
                <Link
                    to="/dashboard">
                    Volver
                </Link>
            </form>
        </div>
    );
};

export default Usuario;