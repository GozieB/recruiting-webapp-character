import { Attributes } from "../types"

interface RequirementBlockProps {
    onCloseHandler: () => void
    reqData: Attributes
}

export default function RequirementBlock({ reqData, onCloseHandler }: RequirementBlockProps) {
    const attributes = Object.keys(reqData) as (keyof Attributes)[]
    return (
        <div className="block">
            {
                attributes.map((key, index) => {
                    return (<div key={index}>{key}:{reqData[key]}</div>)
                })
            }
            <div>
                <button onClick={onCloseHandler}>Close Requirment View</button>
            </div>

        </div>
    )
}
