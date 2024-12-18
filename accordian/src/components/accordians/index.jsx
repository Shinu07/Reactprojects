import { useState } from "react"
import data from "./data.js"
export default function Accordian() {
   
    const [isIdSelected, setIsIdSelected] = useState([]);

    function handleSelections(id) {
        setIsIdSelected(prevState => {
           const selectedId = prevState.includes(id);
           return selectedId ? prevState.filter(x => x !== id) : [...prevState, id];
        });
    }
    

    return (
        <div className="wrapper">
        <div className="accordian">
            {data && data.length > 0 ? (
                data.map((dataItem) => (
                    <div className="Item" key={dataItem.id}>
                        <div className="title" onClick={() => handleSelections(dataItem.id)}>
                            <h3>{dataItem.question}</h3>
                            <span>{isIdSelected.includes(dataItem.id) ? "▲" : "▼"}</span>
                        </div>
                        {isIdSelected.includes(dataItem.id) && (
                            <div className="answer">
                                {dataItem.answer}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <span>No data found</span>
            )}
        </div>
        </div>
    );
}
