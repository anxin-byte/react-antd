import { setTokenKey, setUsernameKey } from "../Type";
import { setToken, setUsername } from "@/utils/cookies"
export function setTokenAction(data){
    setToken(data)
    return {
        type:setTokenKey,
        data
    }
}
export function setUsernameAction(data){
    setUsername(data);
    return {
        type: setUsernameKey,
        value: data
    }
}