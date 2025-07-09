import axios from "axios";
import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import AccountNav from "../components/AccountNav";
import { UserContext } from "../UserContext"
import PlacesPage from "./PlacesPage";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState<any>(null);
    const {ready, user, setUser} : any = useContext(UserContext)
    let {subpage, id} : any = useParams();
    
    if(!subpage && !id) {
        subpage = 'profile'
    } else if(!subpage && id) {
        subpage = 'places'
    }
    if(!ready) {
        return <div>'Loading...'</div>
    }
    if(ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }
    if(redirect) {
        return <Navigate to={redirect} /> 
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null)
        setRedirect('/')
    }
    return (
        <div>
            <AccountNav subpage={subpage}/>
            {
                subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as {user.name} ({user.email}) <br/>
                        <button onClick={logout}  className="primary max-w-sm mt-2">Logout</button>
                    </div>
                )
            }
            {
                subpage === 'places' && (
                    <PlacesPage />
                )
            }
        </div>
    )
}