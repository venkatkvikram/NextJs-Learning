import ImageSlider from "@/components/ImageSlider"
import { serverSideFunction } from "../utils/server-utils"
import { clientSideFunction } from "../utils/client-utils"

export default function ServerRoutePage() {
    const result = serverSideFunction()
    const clientResult = clientSideFunction();
    return (
        <div>
            <ImageSlider />
        </div>
    )

}