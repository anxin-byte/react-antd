import { configAddStatus, configUploadStatus } from "../Type";
export function addStatus(params){
    // console.log("params",params)
    return {
        type: configAddStatus,
        payload: { label: params.label, value: params.value }
    }
}